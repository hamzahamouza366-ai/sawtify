const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

/* ============ حفظ الملفات في مجلد الموسيقى ============ */
function sanitizeFileName(name) {
  let base = String(name || 'track')
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, '_')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120);
  if (!base) base = 'track';
  if (!/\.mp3$/i.test(base)) base += '.mp3';
  return base;
}

async function downloadToMusic(url, filename) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const buf = Buffer.from(await res.arrayBuffer());
  if (!buf.length) throw new Error('ملف فارغ');
  const dir = path.join(app.getPath('music'), 'Sawtify');
  fs.mkdirSync(dir, { recursive: true });
  const base = sanitizeFileName(filename);
  let file = path.join(dir, base);
  let n = 1;
  while (fs.existsSync(file)) {
    file = path.join(dir, base.replace(/\.mp3$/i, ` (${n++}).mp3`));
  }
  fs.writeFileSync(file, buf);
  return file;
}

ipcMain.handle('sawtify:download', async (_event, payload) => {
  try {
    const { url, filename } = payload || {};
    if (!url) return { ok: false, error: 'لا يوجد رابط' };
    const file = await downloadToMusic(url, filename);
    return { ok: true, path: file };
  } catch (err) {
    return { ok: false, error: String((err && err.message) || err) };
  }
});

ipcMain.handle('sawtify:delete', (_event, filePath) => {
  try { fs.unlinkSync(filePath); return true; } catch { return false; }
});

ipcMain.handle('sawtify:openExternal', (_event, url) => {
  try {
    if (typeof url === 'string' && /^https?:\/\//.test(url)) {
      shell.openExternal(url);
      return true;
    }
  } catch { /* لا شيء */ }
  return false;
});

/* ============ جلب JSON مع إعادة محاولة (للشبكات المتقطعة) ============ */
async function fetchJson(url, headers, tries = 2) {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { headers: headers || {} });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return await res.json();
    } catch (err) {
      lastErr = err;
      if (i < tries - 1) await new Promise((r) => setTimeout(r, 600));
    }
  }
  throw lastErr;
}

/* ============ بحث iTunes / Apple Music (معاينات 30 ثانية) ============ */
ipcMain.handle('sawtify:itunes', async (_event, query) => {
  try {
    const q = String(query || '').trim();
    if (!q) return [];
    const url = 'https://itunes.apple.com/search?media=music&entity=song&limit=25&term=' + encodeURIComponent(q);
    const j = await fetchJson(url, { 'User-Agent': 'Mozilla/5.0' });
    return (j.results || []).filter((x) => x.previewUrl).map((x) => ({
      id: String(x.trackId),
      title: x.trackName || '',
      artist: x.artistName || '',
      artwork: String(x.artworkUrl100 || '').replace('100x100', '300x300'),
      duration: 30,
      url: x.previewUrl
    }));
  } catch (err) {
    console.error('itunes failed:', err);
    return [];
  }
});

/* ============ بحث Deezer (معاينات) ============ */
ipcMain.handle('sawtify:deezer', async (_event, query) => {
  try {
    const q = String(query || '').trim();
    if (!q) return [];
    const url = 'https://api.deezer.com/search?limit=25&q=' + encodeURIComponent(q);
    const j = await fetchJson(url);
    return (j.data || []).filter((x) => x.preview).map((x) => ({
      id: String(x.id),
      title: x.title || '',
      artist: (x.artist && x.artist.name) || '',
      artwork: (x.album && (x.album.cover_medium || x.album.cover || '')) || '',
      duration: 30,
      url: x.preview
    }));
  } catch (err) {
    console.error('deezer failed:', err);
    return [];
  }
});

/* ============ بحث Openverse (موسيقى حرة — يضم كتالوج Jamendo و FMA و ccMixter) ============ */
ipcMain.handle('sawtify:openverse', async (_event, query) => {
  try {
    const q = String(query || '').trim();
    if (!q) return [];
    const url = 'https://api.openverse.org/v1/audio/?page_size=20&q=' + encodeURIComponent(q);
    const j = await fetchJson(url, { 'User-Agent': 'Sawtify/1.0', 'Accept': 'application/json' });
    return (j.results || []).filter((x) => x.url).map((x) => ({
      id: String(x.id),
      title: x.title || '',
      artist: x.creator || 'غير معروف',
      artwork: x.thumbnail || '',
      duration: Math.round((x.duration || 0) / 1000) || 0,
      url: x.url
    }));
  } catch (err) {
    console.error('openverse failed:', err);
    return [];
  }
});

/* ============ بحث يوتيوب (قراءة صفحة النتائج وتحليلها) ============ */
function extractBalancedJson(html, startIdx) {
  let depth = 0, inStr = false, esc = false;
  for (let i = startIdx; i < html.length; i++) {
    const c = html[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') inStr = true;
    else if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) return html.slice(startIdx, i + 1);
    }
  }
  return null;
}

function runsText(r) {
  if (!r) return '';
  if (r.simpleText) return r.simpleText;
  if (Array.isArray(r.runs)) return r.runs.map((x) => x.text || '').join('');
  if (r.content) return r.content;
  return '';
}

function parseDurText(s) {
  if (!s) return 0;
  const parts = String(s).split(':').map(Number);
  if (parts.some((n) => Number.isNaN(n))) return 0;
  return parts.reduce((acc, n) => acc * 60 + n, 0);
}

function normalizeThumb(url) {
  if (!url) return '';
  if (url.startsWith('//')) return 'https:' + url;
  return url;
}

function parseYtSearch(html) {
  const marker = 'ytInitialData = ';
  const mi = html.indexOf(marker);
  if (mi < 0) throw new Error('لم يُعثر على ytInitialData في صفحة يوتيوب');
  const braceStart = html.indexOf('{', mi + marker.length);
  if (braceStart < 0) throw new Error('بيانات يوتيوب غير متوقعة');
  const json = extractBalancedJson(html, braceStart);
  if (!json) throw new Error('تعذّر تحليل بيانات يوتيوب');
  const data = JSON.parse(json);

  const results = [];
  const seen = new Set();

  (function walk(node) {
    if (!node || typeof node !== 'object' || results.length >= 14) return;
    if (Array.isArray(node)) { node.forEach(walk); return; }

    // الصيغة القديمة: videoRenderer
    const vr = node.videoRenderer;
    if (vr && vr.videoId && !seen.has(vr.videoId)) {
      seen.add(vr.videoId);
      const thumbs = vr.thumbnail && vr.thumbnail.thumbnails;
      results.push({
        id: vr.videoId,
        title: runsText(vr.title),
        artist: runsText(vr.ownerText || vr.longBylineText || vr.shortBylineText),
        duration: parseDurText(runsText(vr.lengthText)),
        artwork: normalizeThumb(thumbs && thumbs.length ? thumbs[thumbs.length - 1].url : '')
      });
    }

    // الصيغة الجديدة: lockupViewModel
    const lm = node.lockupViewModel;
    if (lm && lm.contentId && String(lm.contentType || '').includes('VIDEO') && !seen.has(lm.contentId)) {
      seen.add(lm.contentId);
      const meta = (lm.normal && lm.normal.metadata && lm.normal.metadata.lockupMetadataViewModel) || {};
      let title = (meta.title && meta.title.content) || '';
      let artist = '', dur = 0;
      const rows = (meta.metadata && meta.metadata.contentMetadataViewModel && meta.metadata.contentMetadataViewModel.metadataRows) || [];
      for (const row of rows) {
        for (const part of (row.metadataParts || [])) {
          const txt = part.text && part.text.content;
          if (!txt) continue;
          if (/^\d+(:\d+)+$/.test(txt)) dur = parseDurText(txt);
          else if (!artist) artist = txt;
        }
      }
      let thumb = '';
      const srcs = lm.thumbnail && lm.thumbnail.thumbnailViewModel && lm.thumbnail.thumbnailViewModel.image && lm.thumbnail.thumbnailViewModel.image.sources;
      if (Array.isArray(srcs) && srcs.length) thumb = srcs[srcs.length - 1].url;
      results.push({ id: lm.contentId, title, artist, duration: dur, artwork: normalizeThumb(thumb) });
    }

    for (const k in node) walk(node[k]);
  })(data);

  return results.filter((v) => v.title);
}

ipcMain.handle('sawtify:ytsearch', async (_event, query) => {
  try {
    const q = String(query || '').trim();
    if (!q) return [];
    const url = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q) + '&hl=ar';
    const res = await fetch(url, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept-Language': 'ar,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml',
        'Cookie': 'SOCS=CAI' // يمنع صفحة الموافقة وحلقات إعادة التوجيه
      }
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const html = await res.text();
    return parseYtSearch(html);
  } catch (err) {
    console.error('ytsearch failed:', err);
    return [];
  }
});

/* ============ النافذة ============ */
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1320,
    height: 860,
    minWidth: 960,
    minHeight: 640,
    backgroundColor: '#0b0b0b',
    icon: path.join(__dirname, 'app.png'),
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: false
    }
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  mainWindow.loadFile('index.html');
  mainWindow.once('ready-to-show', () => mainWindow.show());

  // فتح الروابط الخارجية في المتصفح الافتراضي بدلاً من نافذة جديدة
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });

  const menu = Menu.buildFromTemplate([
    {
      label: 'ملف',
      submenu: [{ role: 'quit', label: 'خروج' }]
    },
    {
      label: 'عرض',
      submenu: [
        { role: 'reload', label: 'إعادة التحميل' },
        { role: 'togglefullscreen', label: 'ملء الشاشة' },
        { type: 'separator' },
        { role: 'zoomIn', label: 'تكبير' },
        { role: 'zoomOut', label: 'تصغير' },
        { role: 'resetZoom', label: 'الحجم الافتراضي' },
        { type: 'separator' },
        { role: 'toggleDevTools', label: 'أدوات المطور' }
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);
}

/* ============ وضع الاختبار: electron . --smoke ============ */
async function runSmokeTest() {
  const out = { step: 'start' };
  try {
    const hosts = await fetch('https://api.audius.co').then((r) => r.json());
    const host = hosts.data[0];
    out.step = 'api';
    const tr = await fetch(host + '/v1/tracks/trending?app_name=SeeniveDesktop&limit=1').then((r) => r.json());
    const t = tr.data[0];
    out.track = t.title;
    out.step = 'download';
    const url = host + '/v1/tracks/' + t.id + '/stream?app_name=SeeniveDesktop';
    const file = await downloadToMusic(url, 'SMOKE - ' + (t.title || 'test') + '.mp3');
    out.file = file;
    out.size = fs.statSync(file).size;
    out.ok = out.size > 1000;
    try { fs.unlinkSync(file); out.cleaned = true; } catch { /* تجاهل */ }
  } catch (e) {
    out.ok = false;
    out.error = String((e && e.message) || e);
  }
  console.log('SMOKE_RESULT ' + JSON.stringify(out));
  app.exit(out.ok ? 0 : 1);
}

/* ============ وضع اختبار الواجهة: electron . --smoke-ui ============ */
async function runUiSmokeTest() {
  const win = new BrowserWindow({
    show: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      backgroundThrottling: false
    }
  });
  await win.loadFile('index.html');
  const script = [
    '(async () => {',
    '  const out = {};',
    '  const wait = (ms) => new Promise((r) => setTimeout(r, ms));',
    '  const stage = document.querySelector("#ytStage");',
    '  const st = () => (ytPlayer && ytPlayer.getPlayerState) ? ytPlayer.getPlayerState() : null;',
    '  try {',
    '    const yt = await window.sawtify.searchYouTube("soolking");',
    '    out.ytCount = yt.length;',
    '    const itRaw = await window.sawtify.searchItunes("soolking");',
    '    const dzRaw = await window.sawtify.searchDeezer("soolking");',
    '    const ovRaw = await window.sawtify.searchOpenverse("soolking");',
    '    out.raw = { itunes: itRaw.length, deezer: dzRaw.length, openverse: ovRaw.length };',
    '    const sig = (a, b) => normText(a) + "|" + normText(b);',
    '    const itSet = new Set(itRaw.map((x) => sig(x.title, x.artist)));',
    '    out.itunesDeezerOverlap = dzRaw.filter((x) => itSet.has(sig(x.title, x.artist))).length;',
    '    els.searchInput.value = "soolking";',
    '    await renderSearch("soolking");',
    '    await wait(1500);',
    '    const keys = ["sAudius", "sArchive", "sOpenverse", "sYouTube", "sDeezer", "sItunes", "sRadio"];',
    '    out.counts = {};',
    '    keys.forEach((k) => { out.counts[k] = (viewLists[k] || []).length; });',
    '    const all = [];',
    '    keys.forEach((k) => (viewLists[k] || []).forEach((t) => all.push(t)));',
    '    const seenT = {};',
    '    let crossDups = 0;',
    '    all.forEach((t) => {',
    '      const n = normText(t.title);',
    '      const a1 = normText(t.artist).split(" ")[0];',
    '      if (!n) return;',
    '      if (seenT[n] && a1 && seenT[n] === a1) crossDups++; else if (!seenT[n]) seenT[n] = a1;',
    '    });',
    '    out.crossDups = crossDups;',
    '    out.total = all.length;',
    '    out.sections = document.querySelectorAll("#searchResults .section").length;',
    '    out.ytSection = !!(viewLists.sYouTube && viewLists.sYouTube.length);',
    '    if (out.ytSection) {',
    '      playContext(viewLists.sYouTube, 0);',
    '      await wait(12000);',
    '      out.engine = state.queue[state.index] && state.queue[state.index].source;',
    '      out.ytState = st();',
    '      out.iframeMounted = !!(stage && stage.querySelector("iframe"));',
    '      out.noPanel = !document.querySelector("#ytPanel");',
    '      out.openBtnVisible = !els.ytOpenBtn.hidden;',
    '      out.audioOnly = out.iframeMounted && out.noPanel;',
    '    }',
    '    if (out.counts.sItunes) {',
    '      playContext(viewLists.sItunes, 0);',
    '      await wait(5000);',
    '      out.itunesPlaying = state.playing;',
    '      out.itunesSrcKind = audio.src.slice(0, 34);',
    '    }',
    '    await renderSearch("chaabi");',
    '    await wait(1500);',
    '    out.counts2 = {',
    '      archive: (viewLists.sArchive || []).length,',
    '      openverse: (viewLists.sOpenverse || []).length,',
    '      itunes: (viewLists.sItunes || []).length,',
    '      deezer: (viewLists.sDeezer || []).length,',
    '      radio: (viewLists.sRadio || []).length',
    '    };',
    '    out.ok = out.ytCount > 0 && out.ytSection && out.audioOnly && out.openBtnVisible &&',
    '      out.raw.itunes > 0 && out.raw.deezer > 0 && out.total > 0 && out.crossDups === 0 &&',
    '      out.counts2.archive > 0 && out.counts2.openverse > 0;',
    '  } catch (e) { out.ok = false; out.err = e.message; }',
    '  return out;',
    '})()'
  ].join('\n');
  const result = await win.webContents.executeJavaScript(script);
  console.log('UI_SMOKE ' + JSON.stringify(result));
  app.exit(result && result.ok ? 0 : 1);
}

if (process.argv.includes('--smoke-ui')) {
  app.whenReady().then(runUiSmokeTest);
} else if (process.argv.includes('--smoke')) {
  app.whenReady().then(runSmokeTest);
} else {
  app.whenReady().then(() => {
    app.setAppUserModelId('com.sawtify.desktop');
    createWindow();
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
