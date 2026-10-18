'use strict';

/* ==================== أدوات عامة ==================== */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

const ICONS = {
  home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  search: 'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  heart: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
  heartOutline: 'M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z',
  clock: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z',
  settings: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z',
  queue: 'M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z',
  close: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
  play: 'M8 5v14l11-7z',
  pause: 'M6 19h4V5H6v14zm8-14v14h4V5h-4z',
  next: 'M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z',
  prev: 'M6 6h2v12H6zm3.5 6l8.5 6V6z',
  shuffle: 'M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z',
  repeat: 'M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z',
  volume: 'M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4-.91 7-4.49 7-8.77s-3-7.86-7-8.77zM16.5 12c0-1.77-1-3.29-2.5-4.03v8.05c1.5-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c-1.6.51-3 1.63-3.99 3.03L8.5 6.5c1.36-1.06 3-1.78 4.75-1.96V3.23M4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z',
  mute: 'M16.5 12c0-1.77-1-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z',
  note: 'M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z',
  album: 'M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z',
  download: 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z',
  open: 'M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z',
  check: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
  trash: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z'
};

function icon(name, size = 24) {
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="currentColor" aria-hidden="true"><path d="${ICONS[name] || ICONS.note}"/></svg>`;
}

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);
}

function fmtTime(sec) {
  if (!isFinite(sec) || sec < 0) return '0:00';
  sec = Math.floor(sec);
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  const mm = String(m).padStart(2, '0');
  const ss = String(s).padStart(2, '0');
  return h ? `${h}:${mm}:${ss}` : `${m}:${ss}`;
}

const APP_NAME = 'SeeniveDesktop';

/* ==================== التخزين المحلي ==================== */
const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem('sawtify_' + key);
      return raw == null ? fallback : JSON.parse(raw);
    } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem('sawtify_' + key, JSON.stringify(value)); } catch { /* ممتلئ */ }
  }
};

let liked = store.get('liked', []);
let recent = store.get('recent', []);
let jamendoClientId = store.get('jamendo_client_id', '');
let downloads = store.get('downloads', {});

/* ==================== طبقة المصادر ==================== */
let hostPromise = null;
function getHost() {
  if (!hostPromise) {
    hostPromise = fetch('https://api.audius.co')
      .then((r) => r.json())
      .then((j) => (Array.isArray(j.data) && j.data[0]) || 'https://discoveryprovider.audius.co')
      .catch((e) => { hostPromise = null; throw e; });
  }
  return hostPromise;
}

async function audius(path) {
  const host = await getHost();
  const url = host + path + (path.includes('?') ? '&' : '?') + 'app_name=' + APP_NAME;
  const res = await fetch(url);
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const json = await res.json();
  if (json.error || (json.status && json.status !== 'success')) {
    throw new Error(json.error || 'خطأ من خادم Audius');
  }
  return json.data || [];
}

function normAudius(t) {
  return {
    key: 'audius:' + t.id,
    id: t.id,
    title: t.title || 'بدون عنوان',
    artist: (t.user && t.user.name) || 'فنان غير معروف',
    artwork: (t.artwork && (t.artwork['480x480'] || t.artwork['150x150'])) || '',
    duration: t.duration || 0,
    source: 'audius',
    downloadable: !!t.is_downloadable
  };
}

function normJamendo(t) {
  return {
    key: 'jamendo:' + t.id,
    id: t.id,
    title: t.name || 'بدون عنوان',
    artist: t.artist_name || 'فنان غير معروف',
    artwork: t.image || t.album_image || '',
    duration: parseInt(t.duration, 10) || 0,
    source: 'jamendo',
    url: t.audio || ''
  };
}

function localFileUrl(p) {
  return 'file:///' + String(p).replace(/\\/g, '/');
}

function durLabel(t) {
  if (t.source === 'radio') return 'مباشر';
  if (t.source === 'itunes' || t.source === 'deezer') return 'معاينة';
  return fmtTime(t.duration);
}

async function streamUrl(t) {
  if (t.local) return localFileUrl(t.local);
  if (t.source === 'jamendo' || t.source === 'radio' || t.source === 'itunes' ||
      t.source === 'deezer' || t.source === 'openverse') return t.url;
  if (t.source === 'archive') return archiveFileUrl(t.id);
  const host = await getHost();
  return host + '/v1/tracks/' + encodeURIComponent(t.id) + '/stream?app_name=' + APP_NAME;
}

function archiveFileUrl(id) {
  const parts = String(id).split('/');
  const ident = parts.shift();
  return 'https://archive.org/download/' + encodeURIComponent(ident) + '/' + parts.map(encodeURIComponent).join('/');
}

async function downloadSourceUrl(t) {
  if (t.source === 'audius') {
    const host = await getHost();
    const base = host + '/v1/tracks/' + encodeURIComponent(t.id);
    return (t.downloadable ? base + '/download?app_name=' : base + '/stream?app_name=') + APP_NAME;
  }
  if (t.source === 'archive') return archiveFileUrl(t.id);
  return t.url;
}

async function jamendoSearch(q) {
  if (!jamendoClientId) return [];
  const url = 'https://api.jamendo.com/v3.0/tracks/?client_id=' + encodeURIComponent(jamendoClientId) +
    '&format=json&limit=40&search=' + encodeURIComponent(q) +
    '&audioformat=mp32&imagesize=400';
  const res = await fetch(url);
  if (!res.ok) throw new Error('Jamendo HTTP ' + res.status);
  const json = await res.json();
  if (json.headers && json.headers.status !== 'ok') {
    throw new Error(json.headers.error_message || 'خطأ من Jamendo');
  }
  return (json.results || []).map(normJamendo);
}

/* ---- يوتيوب (كخطوة بحث ثانية إلى جانب Audius) ---- */
function normYouTube(v) {
  return {
    key: 'yt:' + v.id,
    id: v.id,
    videoId: v.id,
    title: v.title || 'فيديو يوتيوب',
    artist: v.artist || 'YouTube',
    artwork: v.artwork || ('https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg'),
    duration: v.duration || 0,
    source: 'youtube'
  };
}

async function ytSearch(q) {
  if (!window.sawtify) return []; // في المتصفح العادي لا يوجد IPC
  try {
    const list = await window.sawtify.searchYouTube(q);
    return (Array.isArray(list) ? list : []).slice(0, 10).map(normYouTube);
  } catch { return []; }
}

/* ---- أرشيف الإنترنت (archive.org) ---- */
function normArchive(meta, f) {
  return {
    key: 'archive:' + meta.identifier + '/' + f.name,
    id: meta.identifier + '/' + f.name,
    title: ((f.title ? f.title + ' — ' : '') + (meta.title || 'بدون عنوان')).slice(0, 120),
    artist: String(meta.creator || meta.artist || 'أرشيف الإنترنت').slice(0, 80),
    artwork: 'https://archive.org/services/img/' + meta.identifier,
    duration: parseInt(f.length, 10) || 0,
    source: 'archive'
  };
}

async function archiveSearch(q) {
  const url = 'https://archive.org/advancedsearch.php?q=' +
    encodeURIComponent('mediatype:(audio) AND (' + q + ')') +
    '&fl[]=identifier&fl[]=title&fl[]=creator&rows=12&page=1&output=json';
  const res = await fetch(url);
  if (!res.ok) throw new Error('أرشيف الإنترنت HTTP ' + res.status);
  const j = await res.json();
  const docs = (j.response && j.response.docs) || [];
  if (!docs.length) return [];
  const metas = await Promise.allSettled(docs.map((d) =>
    fetch('https://archive.org/metadata/' + encodeURIComponent(d.identifier)).then((r) => r.json())
  ));
  const out = [];
  for (let i = 0; i < metas.length; i++) {
    const r = metas[i];
    if (r.status !== 'fulfilled' || !r.value || !Array.isArray(r.value.files)) continue;
    const md = r.value.metadata || {};
    const f = r.value.files.find((x) => /mp3/i.test(String(x.format || x.name || '')));
    if (!f) continue;
    out.push(normArchive({
      identifier: docs[i].identifier,
      title: md.title || docs[i].title,
      creator: md.creator || md.artist || docs[i].creator
    }, f));
  }
  return out;
}

/* ---- إذاعات مباشرة (Radio Browser — بلا تسجيل) ---- */
async function radioSearch(q) {
  const url = 'https://de1.api.radio-browser.info/json/stations/search?name=' +
    encodeURIComponent(q) + '&limit=10&hidebroken=true&order=clickcount&reverse=true';
  const res = await fetch(url);
  if (!res.ok) throw new Error('خدمة الإذاعات HTTP ' + res.status);
  const list = await res.json();
  return (Array.isArray(list) ? list : []).filter((s) => s && s.url_resolved).map((s) => ({
    key: 'radio:' + s.stationuuid,
    id: s.stationuuid,
    url: s.url_resolved,
    title: String(s.name || 'إذاعة').trim().slice(0, 70),
    artist: (String(s.country || '').trim() ? String(s.country).trim() + ' — ' : '') + 'بث مباشر 📻',
    artwork: s.favicon || '',
    duration: 0,
    source: 'radio'
  }));
}

/* ---- مصادر المعاينات (iTunes / Deezer) والموسيقى الحرة (Openverse) ---- */
function normPreview(v, source) {
  return {
    key: source + ':' + v.id,
    id: v.id,
    title: v.title || 'بدون عنوان',
    artist: v.artist || 'غير معروف',
    artwork: v.artwork || '',
    duration: v.duration || 0,
    url: v.url,
    source
  };
}

async function previewSearch(method, q, source) {
  if (!window.sawtify || typeof window.sawtify[method] !== 'function') return [];
  try {
    const list = await window.sawtify[method](q);
    return (Array.isArray(list) ? list : []).slice(0, 20).map((v) => normPreview(v, source));
  } catch { return []; }
}

/* ---- إزالة التكرار بين المصادر ---- */
function normText(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/\([^)]*\)|\[[^\]]*\]/g, ' ')
    .replace(/\b(official|officiel|officielle|clip|video|audio|lyrics|lyric|hd|4k|remaster|remastered|prod|feat|ft|by|music|song)\b/g, ' ')
    .normalize('NFKD')
    .replace(/[\u064B-\u0652\u0640]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isDuplicate(t, kept) {
  const tt = normText(t.title);
  if (!tt) return false;
  const ta = normText(t.artist);
  for (const k of kept) {
    const kt = normText(k.title);
    if (!kt) continue;
    const titleHit = tt === kt || (tt.length >= 4 && kt.length >= 4 && (tt.includes(kt) || kt.includes(tt)));
    if (!titleHit) continue;
    const ka = normText(k.artist);
    if (!ta || !ka) return true;
    if (ta === ka || ta.includes(ka) || ka.includes(ta)) return true;
    const af = ta.split(' ')[0];
    const kf = ka.split(' ')[0];
    if (af && kf && af === kf && af.length > 2) return true;
  }
  return false;
}

function dedupeLists(order, lists) {
  const kept = [];
  const out = {};
  for (const name of order) {
    const arr = lists[name] || [];
    out[name] = arr.filter((t) => {
      if (isDuplicate(t, kept)) return false;
      kept.push(t);
      return true;
    });
  }
  return out;
}

/* ==================== الحالة ==================== */
const state = {
  page: 'home',
  genre: '',
  queue: [],
  index: -1,
  playing: false,
  shuffle: false,
  repeat: 'off', // off | all | one
  renderSeq: 0
};

const GENRES = [
  { label: 'الكل', value: '' },
  { label: 'هيب هوب', value: 'Hip-Hop/Rap' },
  { label: 'إلكترونية', value: 'Electronic' },
  { label: 'بوب', value: 'Pop' },
  { label: 'روك', value: 'Rock' },
  { label: 'آر آند بي', value: 'R&B/Soul' },
  { label: 'جاز', value: 'Jazz' },
  { label: 'لاتينية', value: 'Latin' },
  { label: 'كلاسيكية', value: 'Classical' },
  { label: 'إمبيينت', value: 'Ambient' },
  { label: 'ميتال', value: 'Metal' },
  { label: 'كنتري', value: 'Country' }
];

const view = $('#view');
let viewLists = {};

/* ==================== عناصر الواجهة ==================== */
const audio = new Audio();
audio.preload = 'auto';

const els = {
  searchInput: $('#searchInput'),
  npArt: $('#npArt'),
  npFallback: $('#npFallback'),
  npTitle: $('#npTitle'),
  npArtist: $('#npArtist'),
  likeBtn: $('#likeBtn'),
  dlBtn: $('#dlBtn'),
  playBtn: $('#playBtn'),
  prevBtn: $('#prevBtn'),
  nextBtn: $('#nextBtn'),
  shuffleBtn: $('#shuffleBtn'),
  repeatBtn: $('#repeatBtn'),
  muteBtn: $('#muteBtn'),
  volumeBar: $('#volumeBar'),
  seekBar: $('#seekBar'),
  curTime: $('#curTime'),
  durTime: $('#durTime'),
  queuePanel: $('#queuePanel'),
  queueList: $('#queueList'),
  ytOpenBtn: $('#ytOpenBtn'),
  modal: $('#modal'),
  toast: $('#toast')
};

/* ==================== مساعدات عرض ==================== */
function toast(msg) {
  els.toast.textContent = msg;
  els.toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => els.toast.classList.remove('show'), 3200);
}

function escAttrArt(t) {
  return t.artwork
    ? `<img src="${esc(t.artwork)}" alt="" loading="lazy">`
    : `<div class="art-fallback">${icon('note', 30)}</div>`;
}

function skeletons(n, type = 'card') {
  let out = '';
  for (let i = 0; i < n; i++) {
    out += type === 'card'
      ? '<div class="sk-card"><div class="sk sk-art"></div><div class="sk sk-line"></div><div class="sk sk-line short"></div></div>'
      : '<div class="sk-row"><div class="sk sk-art"></div><div class="sk-lines"><div class="sk sk-line"></div><div class="sk sk-line short"></div></div></div>';
  }
  return out;
}

function section(title, inner, playAllKey) {
  const pa = playAllKey
    ? `<button class="play-all" data-playall="${esc(playAllKey)}" title="تشغيل الكل">${icon('play', 20)}</button>`
    : '';
  return `<div class="section"><div class="section-head"><h2 class="section-title">${title}</h2>${pa}</div>${inner}</div>`;
}

function emptyState(ic, title, sub) {
  return `<div class="empty">${icon(ic, 60)}<h2>${title}</h2><p>${sub}</p></div>`;
}

function trackCard(t, listKey, i) {
  return `<div class="card" data-track data-list="${esc(listKey)}" data-i="${i}">
    <div class="card-art">${escAttrArt(t)}<span class="card-play">${icon('play', 24)}</span></div>
    <div class="card-title">${esc(t.title)}</div>
    <div class="card-sub">${esc(t.artist)}</div>
  </div>`;
}

function currentKey() {
  const t = state.queue[state.index];
  return t ? t.key : null;
}

function trackRow(t, listKey, i) {
  const isCur = currentKey() === t.key;
  const isLiked = liked.some((x) => x.key === t.key);
  return `<div class="row ${isCur ? 'current' : ''}" data-track data-list="${esc(listKey)}" data-i="${i}">
    <div class="row-num"><span class="row-idx">${i + 1}</span></div>
    <div class="row-art">${escAttrArt(t)}</div>
    <div class="row-main">
      <div class="row-title">${esc(t.title)}</div>
      <div class="row-sub">${esc(t.artist)}</div>
    </div>
    <div class="row-actions">
      <button class="icon-btn dl-btn ${downloads[t.key] ? 'done' : ''}" data-dl="${esc(t.key)}" title="${downloads[t.key] ? 'مُنزَّلة — اضغط للحذف' : 'تنزيل للأوفلاين'}">
        ${icon(downloads[t.key] ? 'check' : 'download', 18)}
      </button>
      <button class="icon-btn heart-btn ${isLiked ? 'liked' : ''}" data-like="${esc(t.key)}" title="مفضلة">
        ${icon(isLiked ? 'heart' : 'heartOutline', 18)}
      </button>
      <span class="row-dur">${durLabel(t)}</span>
    </div>
  </div>`;
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'صباح الخير 🌤️';
  if (h < 17) return 'مساء الخير ☀️';
  return 'مساء الخير 🌙';
}

function setActiveNav(page) {
  $$('.nav-btn[data-page]').forEach((b) => b.classList.toggle('active', b.dataset.page === page));
}

/* ==================== الصفحات ==================== */
async function renderHome() {
  state.page = 'home';
  setActiveNav('home');
  const seq = ++state.renderSeq;
  const genre = state.genre;

  view.innerHTML = `
    <div class="hero">
      <h1>${greeting()}</h1>
      <p>موسيقى مجانية قانونياً — بدون حساب، بدون إعلانات، بلا حدود.</p>
    </div>
    <div class="chips">
      ${GENRES.map((g) => `<button class="chip ${g.value === genre ? 'active' : ''}" data-value="${esc(g.value)}">${g.label}</button>`).join('')}
    </div>
    <div id="homeSections">
      <div class="section"><div class="section-head"><h2 class="section-title">الأكثر رواجاً</h2></div><div class="grid">${skeletons(8)}</div></div>
      <div class="section"><div class="section-head"><h2 class="section-title">قوائم تشغيل رائجة</h2></div><div class="grid">${skeletons(6)}</div></div>
    </div>`;
  view.scrollTop = 0;

  const [tracks, playlists] = await Promise.allSettled([
    audius('/v1/tracks/trending?limit=20' + (genre ? '&genre=' + encodeURIComponent(genre) : '')),
    audius('/v1/playlists/trending?limit=12')
  ]);
  if (seq !== state.renderSeq || state.page !== 'home') return;

  let html = '';

  if (recent.length && !genre) {
    const recents = recent.slice(0, 6);
    viewLists.recentHome = recents;
    html += section('استمع مجدداً', recents.map((t, i) => trackCard(t, 'recentHome', i)).join(''), 'recentHome');
  }

  if (tracks.status === 'fulfilled' && tracks.value.length) {
    viewLists.trending = tracks.value.map(normAudius);
    html += section('الأكثر رواجاً', viewLists.trending.map((t, i) => trackCard(t, 'trending', i)).join(''), 'trending');
  } else {
    html += section('الأكثر رواجاً', `<p class="muted" style="padding:8px 4px">تعذّر التحميل — تحقق من اتصالك بالإنترنت.</p>`);
  }

  if (playlists.status === 'fulfilled' && playlists.value.length) {
    html += section('قوائم تشغيل رائجة', playlists.value.map((p) => `
      <div class="card" data-playlist="${esc(p.id)}" data-name="${esc(p.playlist_name)}" data-art="${esc((p.artwork && (p.artwork['480x480'] || p.artwork['150x150'])) || '')}">
        <div class="card-art">${escAttrArt({ artwork: (p.artwork && (p.artwork['480x480'] || p.artwork['150x150'])) || '' })}
          <span class="card-play">${icon('play', 24)}</span>
        </div>
        <div class="card-title">${esc(p.playlist_name)}</div>
        <div class="card-sub">${p.track_count || ''} ${p.track_count === 1 ? 'أغنية' : 'أغنية'}</div>
      </div>`).join(''));
  }

  const holder = $('#homeSections');
  if (holder) holder.innerHTML = html || emptyState('note', 'لا يوجد محتوى', 'جرّب تصنيفاً آخر.');
}

async function renderSearch(q) {
  state.page = 'search';
  setActiveNav('search');
  const seq = ++state.renderSeq;
  q = (q || '').trim();

  if (!q) {
    view.innerHTML = `
      <div class="page-head">
        <h1>البحث</h1>
        <p class="muted">ابحث في Audius ويوتيوب وأرشيف الإنترنت والإذاعات — مجاناً وبدون حساب.</p>
      </div>
      <div class="section"><div class="section-head"><h2 class="section-title">الأكثر رواجاً الآن</h2></div><div class="grid">${skeletons(10)}</div></div>`;
    view.scrollTop = 0;
    try {
      const tr = await audius('/v1/tracks/trending?limit=20');
      if (seq !== state.renderSeq || state.page !== 'search') return;
      viewLists.search = tr.map(normAudius);
      const grid = $('.grid', view);
      if (grid) grid.innerHTML = viewLists.search.map((t, i) => trackCard(t, 'search', i)).join('');
    } catch {
      const grid = $('.grid', view);
      if (grid) grid.innerHTML = '<p class="muted">تعذّر التحميل — تحقق من اتصالك بالإنترنت.</p>';
    }
    return;
  }

  view.innerHTML = `
    <div class="page-head"><h1>نتائج البحث عن «${esc(q)}»</h1></div>
    <div id="searchResults">${skeletons(7, 'row')}</div>`;
  view.scrollTop = 0;

  const settled = await Promise.allSettled([
    audius('/v1/tracks/search?limit=40&query=' + encodeURIComponent(q)),
    ytSearch(q),
    archiveSearch(q),
    radioSearch(q),
    previewSearch('searchItunes', q, 'itunes'),
    previewSearch('searchDeezer', q, 'deezer'),
    previewSearch('searchOpenverse', q, 'openverse')
  ]);
  if (seq !== state.renderSeq || state.page !== 'search') return;

  const val = (i) => (settled[i] && settled[i].status === 'fulfilled') ? settled[i].value : [];
  const audiusTracks = val(0).map(normAudius);
  const listsRaw = {
    sAudius: audiusTracks,
    sArchive: val(2),
    sOpenverse: val(6),
    sYouTube: val(1),
    sDeezer: val(5),
    sItunes: val(4),
    sRadio: val(3)
  };

  const holder = $('#searchResults');
  if (!holder) return;

  // إزالة التكرار مع إعطاء الأولوية للمصادر الكاملة (Audius/الأرشيف/Openverse) قبل المعاينات
  const deduped = dedupeLists(['sAudius', 'sArchive', 'sOpenverse', 'sYouTube', 'sDeezer', 'sItunes', 'sRadio'], listsRaw);
  const total = Object.keys(deduped).reduce((n, k) => n + deduped[k].length, 0);

  ['sAudius', 'sArchive', 'sOpenverse', 'sYouTube', 'sDeezer', 'sItunes', 'sRadio'].forEach((k) => { delete viewLists[k]; });

  if (!total) {
    const err = settled[0].status === 'rejected' ? '<p class="muted">تعذّر الوصول إلى المصادر — تحقق من الإنترنت وحاول مجدداً.</p>' : '';
    holder.innerHTML = emptyState('search', 'لا توجد نتائج', `لم نعثر على نتائج لـ «${esc(q)}». جرّب كلمات أخرى.`) + err;
    return;
  }

  const defs = [
    ['sAudius', 'Audius'],
    ['sArchive', '🏛️ أرشيف الإنترنت'],
    ['sOpenverse', '🌍 موسيقى حرة (Openverse)'],
    ['sYouTube', '🎬 YouTube'],
    ['sDeezer', '🎵 Deezer — معاينة 30 ثانية'],
    ['sItunes', '🍎 Apple Music — معاينة 30 ثانية'],
    ['sRadio', '📻 إذاعات مباشرة']
  ];
  let html = '';
  if (settled[0].status === 'rejected') html += `<p class="muted" style="padding:6px 4px">تعذّر البحث في Audius الآن.</p>`;
  for (const [key, label] of defs) {
    const arr = deduped[key];
    if (!arr || !arr.length) continue;
    viewLists[key] = arr;
    html += section(label, `<div class="list">${arr.map((t, i) => trackRow(t, key, i)).join('')}</div>`, key);
  }
  holder.innerHTML = html;
}

async function openPlaylist(id, name, artwork) {
  state.page = 'playlist';
  setActiveNav('');
  const seq = ++state.renderSeq;
  const listKey = 'pl_' + id;

  view.innerHTML = `
    <div class="pl-head">
      <div class="pl-art">${artwork ? `<img src="${esc(artwork)}" alt="">` : `<div class="art-fallback">${icon('album', 64)}</div>`}</div>
      <div class="pl-meta">
        <div class="type">قائمة تشغيل</div>
        <h1>${esc(name)}</h1>
        <div class="info" id="plCount">…</div>
      </div>
    </div>
    <div class="pl-actions">
      <button class="big-play" data-playall="${esc(listKey)}" title="تشغيل الكل">${icon('play', 28)}</button>
    </div>
    <div class="list" id="plList">${skeletons(8, 'row')}</div>`;
  view.scrollTop = 0;

  try {
    const tracks = await audius('/v1/playlists/' + encodeURIComponent(id) + '/tracks?limit=200');
    if (seq !== state.renderSeq || state.page !== 'playlist') return;
    viewLists[listKey] = tracks.map(normAudius);
    const list = $('#plList');
    const count = $('#plCount');
    if (count) count.textContent = viewLists[listKey].length + ' أغنية';
    if (list) {
      list.innerHTML = viewLists[listKey].length
        ? viewLists[listKey].map((t, i) => trackRow(t, listKey, i)).join('')
        : emptyState('note', 'قائمة فارغة', 'لا توجد أغانٍ في هذه القائمة.');
    }
  } catch {
    if (seq !== state.renderSeq) return;
    const list = $('#plList');
    if (list) list.innerHTML = emptyState('note', 'تعذّر التحميل', 'حدث خطأ أثناء تحميل قائمة التشغيل.');
  }
}

function renderLiked() {
  state.page = 'liked';
  setActiveNav('liked');
  state.renderSeq++;
  view.scrollTop = 0;

  if (!liked.length) {
    view.innerHTML = `<div class="page-head"><h1>أغنياتي المفضلة</h1></div>` +
      emptyState('heart', 'لا توجد أغنيات مفضلة بعد', 'اضغط على القلب ♡ بجانب أي أغنية لإضافتها هنا.');
    return;
  }
  viewLists.likedPage = liked;
  view.innerHTML = `
    <div class="page-head"><h1>أغنياتي المفضلة</h1><p class="muted">${liked.length} أغنية</p></div>
    <div class="pl-actions"><button class="big-play" data-playall="likedPage" title="تشغيل الكل">${icon('play', 28)}</button></div>
    <div class="list">${liked.map((t, i) => trackRow(t, 'likedPage', i)).join('')}</div>`;
}

function renderRecent() {
  state.page = 'recent';
  setActiveNav('recent');
  state.renderSeq++;
  view.scrollTop = 0;

  if (!recent.length) {
    view.innerHTML = `<div class="page-head"><h1>آخر ما استمعت</h1></div>` +
      emptyState('clock', 'لا يوجد سجل استماع', 'ابدأ الاستماع وستظهر أغنياتك هنا.');
    return;
  }
  viewLists.recentPage = recent;
  view.innerHTML = `
    <div class="page-head"><h1>آخر ما استمعت</h1><p class="muted">${recent.length} أغنية</p></div>
    <div class="pl-actions"><button class="big-play" data-playall="recentPage" title="تشغيل الكل">${icon('play', 28)}</button></div>
    <div class="list">${recent.map((t, i) => trackRow(t, 'recentPage', i)).join('')}</div>`;
}

/* ==================== التشغيل ==================== */
let loadToken = 0;

async function playContext(list, index) {
  if (!list || !list.length || index < 0 || index >= list.length) return;
  ytErroredIds = new Set(); // اختيار صريح = فرصة جديدة لكل الفيديوهات
  state.queue = list.slice();
  state.index = index;
  await loadCurrent();
  renderQueue();
  refreshRowHighlights();
}

async function loadCurrent() {
  const t = state.queue[state.index];
  if (!t) return;
  const token = ++loadToken;

  updateNowPlaying(t);

  if (t.source === 'youtube') {
    audio.pause();
    try {
      await startYt(t);
      if (token !== loadToken) return;
      state.playing = true;
      syncPlayUI();
      pushRecent(t);
    } catch (e) {
      if (token !== loadToken) return;
      state.playing = false;
      syncPlayUI();
      if (ytPlayer && ytPendingId != null) {
        toast('مشغل يوتيوب يُحمَّل الآن… سيبدأ التشغيل تلقائياً');
        return; // سيُحمَّل المقطع عبر onReady بمجرد الجاهزية
      }
      toast('تعذّر تشغيل «' + t.title + '» من يوتيوب — تحقق من اتصالك');
    }
    return;
  }

  stopYt();

  try {
    const url = await streamUrl(t);
    if (!url) throw new Error('لا يوجد رابط صوتي');
    if (token !== loadToken) return;
    audio.src = url;
    await audio.play();
    if (token !== loadToken) return;
    pushRecent(t);
  } catch (err) {
    if (token !== loadToken) return;
    state.playing = false;
    syncPlayUI();
    toast('تعذّر تشغيل «' + t.title + '» — جرّب أغنية أخرى');
  }
}

function updateNowPlaying(t) {
  if (t.artwork) {
    els.npArt.src = t.artwork;
    els.npArt.hidden = false;
    els.npFallback.hidden = true;
  } else {
    els.npArt.hidden = true;
    els.npFallback.hidden = false;
  }
  els.npTitle.textContent = t.title;
  const srcLabel = t.local ? 'تنزيل محلي'
    : t.source === 'youtube' ? 'YouTube'
    : t.source === 'archive' ? 'أرشيف الإنترنت'
    : t.source === 'radio' ? 'بث مباشر'
    : t.source === 'itunes' ? 'Apple Music (معاينة)'
    : t.source === 'deezer' ? 'Deezer (معاينة)'
    : t.source === 'openverse' ? 'موسيقى حرة'
    : t.source === 'jamendo' ? 'Jamendo' : 'Audius';
  els.npArtist.textContent = t.artist + ' · ' + srcLabel;
  els.ytOpenBtn.hidden = t.source !== 'youtube'; // زر الفتح على يوتيوب لأغاني يوتيوب فقط
  syncLikeBtn(t);
  els.curTime.textContent = '0:00';
  els.durTime.textContent = t.source === 'radio' ? 'مباشر'
    : (t.source === 'itunes' || t.source === 'deezer') ? 'معاينة' : fmtTime(t.duration);
  els.seekBar.value = 0;
}

function togglePlay() {
  if (state.index < 0 || !state.queue.length) {
    const first = viewLists.trending || viewLists.search || null;
    if (first && first.length) { playContext(first, 0); return; }
    toast('اختر أغنية لبدء التشغيل');
    return;
  }
  if (engineIsYt()) {
    if (!ytPlayer) { loadCurrent(); return; }
    try {
      const YTS = window.YT && window.YT.PlayerState;
      if (YTS && ytPlayer.getPlayerState() === YTS.PLAYING) ytPlayer.pauseVideo();
      else ytPlayer.playVideo();
    } catch { loadCurrent(); }
    return;
  }
  if (audio.paused) {
    if (audio.src) audio.play().catch(() => toast('تعذّر متابعة التشغيل'));
    else loadCurrent();
  } else {
    audio.pause();
  }
}

function nextTrack(auto = false) {
  if (!state.queue.length) return;
  if (state.shuffle && state.queue.length > 1) {
    let n = state.index;
    while (n === state.index) n = Math.floor(Math.random() * state.queue.length);
    state.index = n;
  } else if (state.index < state.queue.length - 1) {
    state.index++;
  } else if (state.repeat === 'all' || !auto) {
    state.index = 0;
  } else {
    state.playing = false;
    syncPlayUI();
    audio.currentTime = 0;
    return;
  }
  loadCurrent().then(renderQueue).then(refreshRowHighlights);
}

function prevTrack() {
  if (!state.queue.length) return;
  if (engineIsYt()) {
    if (ytPlayer && ytPlayer.getCurrentTime && ytPlayer.getCurrentTime() > 3) {
      try { ytPlayer.seekTo(0, true); return; } catch { /* أكمل */ }
    }
    if (state.index > 0) state.index--;
    else if (state.repeat === 'all') state.index = state.queue.length - 1;
    else { if (ytPlayer) { try { ytPlayer.seekTo(0, true); } catch { /* لا شيء */ } } return; }
    loadCurrent().then(renderQueue).then(refreshRowHighlights);
    return;
  }
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
    return;
  }
  if (state.index > 0) state.index--;
  else if (state.repeat === 'all') state.index = state.queue.length - 1;
  else audio.currentTime = 0;
  loadCurrent().then(renderQueue).then(refreshRowHighlights);
}

function refreshRowHighlights() {
  const key = currentKey();
  $$('.row', view).forEach((r) => {
    const list = viewLists[r.dataset.list];
    const t = list && list[+r.dataset.i];
    r.classList.toggle('current', !!t && t.key === key);
  });
  renderQueue();
}

/* ==================== المفضلة والسجل ==================== */
function isLiked(key) {
  return liked.some((x) => x.key === key);
}

function toggleLike(t) {
  if (!t) return;
  if (isLiked(t.key)) {
    liked = liked.filter((x) => x.key !== t.key);
    toast('أُزيلت من المفضلة');
  } else {
    liked.unshift(t);
    if (liked.length > 300) liked.pop();
    toast('أُضيفت إلى المفضلة ❤️');
  }
  store.set('liked', liked);
  syncLikeBtn(state.queue[state.index]);
  if (state.page === 'liked') renderLiked();
  $$('.heart-btn').forEach((btn) => {
    const on = isLiked(btn.dataset.like);
    btn.classList.toggle('liked', on);
    btn.innerHTML = icon(on ? 'heart' : 'heartOutline', 18);
  });
}

function pushRecent(t) {
  recent = [t].concat(recent.filter((x) => x.key !== t.key)).slice(0, 30);
  store.set('recent', recent);
}

/* ==================== واجهة المشغل ==================== */
function syncPlayUI() {
  els.playBtn.innerHTML = state.playing ? icon('pause', 26) : icon('play', 26);
  if (state.index >= 0 && state.queue[state.index]) {
    els.npTitle.style.color = '';
  }
}

function syncLikeBtn(t) {
  const on = t && isLiked(t.key);
  els.likeBtn.innerHTML = icon(on ? 'heart' : 'heartOutline', 20);
  els.likeBtn.classList.toggle('active', !!on);
  els.likeBtn.title = on ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة';
}

function syncShuffleUI() {
  els.shuffleBtn.classList.toggle('active', state.shuffle);
}

function syncRepeatUI() {
  els.repeatBtn.classList.toggle('active', state.repeat !== 'off');
  els.repeatBtn.classList.toggle('repeat-one', state.repeat === 'one');
  els.repeatBtn.title = state.repeat === 'off' ? 'التكرار: مغلق'
    : state.repeat === 'all' ? 'التكرار: القائمة كاملة' : 'التكرار: الأغنية الحالية';
}

audio.addEventListener('play', () => { state.playing = true; syncPlayUI(); });
audio.addEventListener('pause', () => { state.playing = false; syncPlayUI(); });

audio.addEventListener('timeupdate', () => {
  if (engineIsYt() || seekDragging) return;
  const dur = isFinite(audio.duration) ? audio.duration : 0;
  els.seekBar.value = dur ? (audio.currentTime / dur) * 100 : 0;
  els.curTime.textContent = fmtTime(audio.currentTime);
  if (dur) els.durTime.textContent = fmtTime(dur);
});

audio.addEventListener('loadedmetadata', () => {
  if (isFinite(audio.duration)) els.durTime.textContent = fmtTime(audio.duration);
});

audio.addEventListener('ended', () => {
  if (state.repeat === 'one') {
    audio.currentTime = 0;
    audio.play().catch(() => {});
    return;
  }
  nextTrack(true);
});

audio.addEventListener('error', () => {
  if (audio.src && state.index >= 0) {
    toast('تعذّر تحميل الصوت — قد تكون الأغنية غير متاحة مؤقتاً');
  }
});

/* ---- أشرطة التقدم والصوت ---- */
let seekDragging = false;
els.seekBar.addEventListener('pointerdown', () => { seekDragging = true; });
els.seekBar.addEventListener('input', () => {
  const dur = engineIsYt() ? ytDuration() : (isFinite(audio.duration) ? audio.duration : 0);
  els.curTime.textContent = fmtTime((+els.seekBar.value / 100) * dur);
});
els.seekBar.addEventListener('change', () => {
  if (engineIsYt()) {
    const d = ytDuration();
    if (d && ytPlayer) { try { ytPlayer.seekTo((+els.seekBar.value / 100) * d, true); } catch { /* لا شيء */ } }
    seekDragging = false;
    return;
  }
  const dur = isFinite(audio.duration) ? audio.duration : 0;
  if (dur) audio.currentTime = (+els.seekBar.value / 100) * dur;
  seekDragging = false;
});
els.seekBar.addEventListener('pointerup', () => { seekDragging = false; });

els.volumeBar.value = store.get('volume', 0.8);
audio.volume = store.get('volume', 0.8);
els.volumeBar.addEventListener('input', () => {
  const v = +els.volumeBar.value;
  audio.volume = v;
  audio.muted = v === 0;
  if (engineIsYt() && ytPlayer && ytPlayer.setVolume) {
    try { ytPlayer.setVolume(v * 100); } catch { /* لا شيء */ }
  }
  store.set('volume', v);
  syncMuteUI();
});

function syncMuteUI() {
  const off = audio.muted || audio.volume === 0;
  els.muteBtn.innerHTML = icon(off ? 'mute' : 'volume', 20);
  els.muteBtn.classList.toggle('active', off);
}
els.muteBtn.addEventListener('click', () => {
  if (audio.muted || audio.volume === 0) {
    audio.muted = false;
    if (audio.volume === 0) {
      audio.volume = store.get('volume', 0.8) || 0.8;
      els.volumeBar.value = audio.volume;
    }
    if (engineIsYt() && ytPlayer) {
      try { ytPlayer.unMute(); ytPlayer.setVolume(audio.volume * 100); } catch { /* لا شيء */ }
    }
  } else {
    audio.muted = true;
    if (engineIsYt() && ytPlayer) { try { ytPlayer.mute(); } catch { /* لا شيء */ } }
  }
  syncMuteUI();
});

els.playBtn.addEventListener('click', togglePlay);
els.nextBtn.addEventListener('click', () => nextTrack(false));
els.prevBtn.addEventListener('click', prevTrack);

els.shuffleBtn.addEventListener('click', () => {
  state.shuffle = !state.shuffle;
  syncShuffleUI();
  toast(state.shuffle ? 'التشغيل العشوائي مفعّل 🔀' : 'التشغيل العشوائي متوقف');
});

els.repeatBtn.addEventListener('click', () => {
  state.repeat = state.repeat === 'off' ? 'all' : state.repeat === 'all' ? 'one' : 'off';
  syncRepeatUI();
  toast(state.repeat === 'off' ? 'التكرار: مغلق' : state.repeat === 'all' ? 'تكرار القائمة 🔁' : 'تكرار الأغنية 🔁1');
});

els.likeBtn.addEventListener('click', () => {
  const t = state.queue[state.index];
  if (t) toggleLike(t);
  else toast('شغّل أغنية أولاً لإضافتها إلى المفضلة');
});

/* ==================== لوحة قائمة التشغيل ==================== */
function renderQueue() {
  if (!state.queue.length) {
    els.queueList.innerHTML = '<div class="empty-small">قائمة التشغيل فارغة — اختر أغنية للبدء.</div>';
    return;
  }
  els.queueList.innerHTML = state.queue.map((t, i) => `
    <div class="q-item ${i === state.index ? 'current' : ''}" data-q="${i}">
      <span class="q-num">${i === state.index && state.playing ? icon('play', 13) : i + 1}</span>
      <span class="q-text">
        <span class="q-title">${esc(t.title)}</span>
        <span class="q-artist">${esc(t.artist)}</span>
      </span>
      <span class="q-dur">${durLabel(t)}</span>
    </div>`).join('');
}

function toggleQueue(force) {
  const show = force != null ? force : els.queuePanel.hidden;
  els.queuePanel.hidden = !show;
  if (show) renderQueue();
}

$('#queueToggle').addEventListener('click', () => toggleQueue());
$('#queueClose').addEventListener('click', () => toggleQueue(false));
els.queueList.addEventListener('click', (e) => {
  const item = e.target.closest('[data-q]');
  if (!item) return;
  ytErroredIds = new Set(); // اختيار صريح من القائمة = فرصة جديدة
  state.index = +item.dataset.q;
  loadCurrent().then(refreshRowHighlights);
});

/* ==================== التنقل والتفاعل مع العرض ==================== */
$$('.nav-btn[data-page]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const page = btn.dataset.page;
    if (page === 'home') renderHome();
    else if (page === 'search') { renderSearch(els.searchInput.value); els.searchInput.focus(); }
    else if (page === 'liked') renderLiked();
    else if (page === 'recent') renderRecent();
    else if (page === 'downloads') renderDownloads();
  });
});

let searchTimer = null;
els.searchInput.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => renderSearch(els.searchInput.value), 320);
});
els.searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    clearTimeout(searchTimer);
    renderSearch(els.searchInput.value);
  }
});

view.addEventListener('click', (e) => {
  // أزرار المفضلة أولاً
  const likeBtn = e.target.closest('[data-like]');
  if (likeBtn) {
    e.stopPropagation();
    const [src, id] = likeBtn.dataset.like.split(':');
    const all = Object.values(viewLists).flat();
    const t = all.find((x) => x.key === likeBtn.dataset.like) ||
      (src && id ? { key: likeBtn.dataset.like, id, title: '', artist: '', artwork: '', duration: 0, source: src, url: '' } : null);
    if (t && t.title) toggleLike(t);
    else toast('تعذّر التعرف على الأغنية');
    return;
  }

  const dlBtn = e.target.closest('[data-dl]');
  if (dlBtn) {
    e.stopPropagation();
    const t = findTrackByKey(dlBtn.dataset.dl);
    if (!t) return;
    if (downloads[t.key] && state.page === 'downloads') removeDownload(t.key);
    else downloadTrack(t);
    return;
  }

  const playAll = e.target.closest('[data-playall]');
  if (playAll) {
    const list = viewLists[playAll.dataset.playall];
    if (list && list.length) playContext(list, 0);
    else toast('جاري التحميل…');
    return;
  }

  const trackEl = e.target.closest('[data-track]');
  if (trackEl) {
    const list = viewLists[trackEl.dataset.list];
    if (list) playContext(list, +trackEl.dataset.i);
    return;
  }

  const pl = e.target.closest('[data-playlist]');
  if (pl) {
    openPlaylist(pl.dataset.playlist, pl.dataset.name, pl.dataset.art);
    return;
  }

  const chip = e.target.closest('.chip');
  if (chip) {
    state.genre = chip.dataset.value || '';
    renderHome();
  }
});

// بدائل الصور عند فشل التحميل (عبر مراقبة أحداث img في مرحلة الالتقاط)
view.addEventListener('error', (e) => {
  const img = e.target;
  if (img && img.tagName === 'IMG') {
    const holder = img.parentNode;
    if (holder && holder.classList.contains('art-fallback') === false) {
      img.remove();
      if (!holder.querySelector('.art-fallback')) {
        holder.insertAdjacentHTML('afterbegin', `<div class="art-fallback">${icon('note', 26)}</div>`);
      }
    }
  }
}, true);

els.npArt.addEventListener('error', () => {
  els.npArt.hidden = true;
  els.npFallback.hidden = false;
});

/* ==================== الإعدادات ==================== */
function openModal() {
  els.modal.hidden = false;
}
function closeModal() { els.modal.hidden = true; }

$('#settingsBtn').addEventListener('click', openModal);
$('#modalClose').addEventListener('click', closeModal);
els.modal.addEventListener('click', (e) => { if (e.target === els.modal) closeModal(); });

/* (أُزيل حقل Jamendo من الإعدادات — التطبيق يعمل كاملاً عبر Audius بدون أي تسجيل) */

/* ==================== بروكسي (لتجاوز حجب يوتيوب) ==================== */
const proxyInput = $('#proxyInput');
const proxyApply = $('#proxyApply');
const proxyClear = $('#proxyClear');
const proxyStatus = $('#proxyStatus');

async function loadProxySetting() {
  const saved = localStorage.getItem('sawtify_proxy') || '';
  if (proxyInput) proxyInput.value = saved;
  if (window.sawtify && window.sawtify.setProxy) {
    const r = await window.sawtify.setProxy(saved);
    if (saved && proxyStatus) {
      proxyStatus.textContent = r && r.ok
        ? (r.test && r.test.ok ? '✔ البروكسي يعمل (HTTP ' + r.test.status + ')' : '⚠ تطبيق البروكسي… جرّب تشغيل يوتيوب')
        : '✗ ' + ((r && r.error) || 'تعذّر تطبيق البروكسي');
    }
  }
}

if (proxyApply) proxyApply.addEventListener('click', async () => {
  const val = (proxyInput.value || '').trim();
  localStorage.setItem('sawtify_proxy', val);
  if (proxyStatus) proxyStatus.textContent = 'جاري التطبيق…';
  const r = await window.sawtify.setProxy(val);
  if (r && r.ok) {
    proxyStatus.textContent = val
      ? (r.test && r.test.ok ? '✔ البروكسي يعمل — YouTube سيستخدمه' : '✔ تم التطبيق — جرّب YouTube')
      : '✔ أُلغِي البروكسي — استخدام مباشر';
  } else {
    proxyStatus.textContent = '✗ ' + ((r && r.error) || 'تعذّر تطبيق البروكسي');
  }
});
if (proxyClear) proxyClear.addEventListener('click', async () => {
  proxyInput.value = '';
  localStorage.removeItem('sawtify_proxy');
  const r = await window.sawtify.setProxy('');
  if (proxyStatus) proxyStatus.textContent = '✔ أُلغِي البروكسي';
});

// تطبيق البروكسي المحفوظ عند الإقلاع
loadProxySetting().catch(() => { /* تجاهل */ });

/* ==================== اختصارات لوحة المفاتيح ==================== */
document.addEventListener('keydown', (e) => {
  const tag = document.activeElement ? document.activeElement.tagName : '';
  const typing = tag === 'INPUT' || tag === 'TEXTAREA';
  if (e.key === 'Escape') {
    if (!els.modal.hidden) closeModal();
    else if (!els.queuePanel.hidden) toggleQueue(false);
    return;
  }
  if (typing) return;
  if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
  else if (e.code === 'ArrowRight' && e.shiftKey) { e.preventDefault(); nextTrack(false); }
  else if (e.code === 'ArrowLeft' && e.shiftKey) { e.preventDefault(); prevTrack(); }
  else if (e.key === '/') { e.preventDefault(); els.searchInput.focus(); }
});

/* ==================== مشغل يوتيوب المضمّن ==================== */
const __ytDiag = []; // تشخيص داخلي لحالات المشغل
let ytPlayer = null;
let ytApiRequested = false;
let ytReadyFired = false;
let ytPendingId = null;

function engineIsYt() {
  const t = state.queue[state.index];
  return !!t && t.source === 'youtube';
}

function ytDuration() {
  if (!ytPlayer || !ytPlayer.getDuration) return 0;
  try { return ytPlayer.getDuration() || 0; } catch { return 0; }
}

function stopYt() {
  if (ytPlayer) { try { ytPlayer.stopVideo(); } catch { /* لا شيء */ } }
}

window.onYouTubeIframeAPIReady = function () { createYtPlayer(); };

function requestYtApi() {
  if (ytPlayer) return;
  if (window.YT && window.YT.Player) { createYtPlayer(); return; }
  if (ytApiRequested) return;
  ytApiRequested = true;
  const s = document.createElement('script');
  s.src = 'https://www.youtube.com/iframe_api';
  s.onerror = () => toast('تعذّر تحميل مشغل يوتيوب — تحقق من الاتصال بالإنترنت');
  document.head.appendChild(s);
}

function createYtPlayer() {
  if (ytPlayer || !window.YT || !window.YT.Player) return;
  const host = $('#ytHost');
  if (!host) return;
  ytPlayer = new window.YT.Player(host, {
    width: '100%',
    height: '100%',
    playerVars: { autoplay: 1, rel: 0, playsinline: 1, modestbranding: 1 },
    events: {
      onReady: () => {
        __ytDiag.push('ready');
        ytReadyFired = true;
        if (ytPendingId != null && ytPlayer) {
          try { ytPlayer.loadVideoById(ytPendingId); } catch { /* لا شيء */ }
          ytPendingId = null;
        }
      },
      onStateChange: onYtState,
      onError: (e) => onYtError(e)
    }
  });
}

function ensureYtReady() {
  requestYtApi();
  if (ytPlayer && ytReadyFired) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const t0 = Date.now();
    const iv = setInterval(() => {
      if (ytPlayer && ytReadyFired) { clearInterval(iv); resolve(); }
      else if (Date.now() - t0 > 12000) { clearInterval(iv); reject(new Error('مشغل يوتيوب لم يجهز')); }
    }, 100);
  });
}

async function startYt(t) {
  ytPendingId = t.id; // يُحمَّل تلقائياً عبر onReady إن تأخرت الجاهزية
  await ensureYtReady();
  if (state.queue[state.index] !== t) return; // تغيّر الترتيب أثناء الانتظار
  if (ytPendingId === t.id) {
    ytPendingId = null;
    ytPlayer.loadVideoById(t.id);
  }
}

function onYtState(e) {
  __ytDiag.push('S' + e.data);
  const cur = state.queue[state.index];
  if (!cur || cur.source !== 'youtube') return; // أحداث لم تعد مهمة
  const YTS = window.YT.PlayerState;
  if (e.data === YTS.PLAYING) {
    state.playing = true;
    syncPlayUI();
    pushRecent(cur);
  } else if (e.data === YTS.PAUSED) {
    state.playing = false;
    syncPlayUI();
  } else if (e.data === YTS.ENDED) {
    if (state.repeat === 'one') {
      try { ytPlayer.loadVideoById(cur.id); } catch { /* لا شيء */ }
    } else {
      state.playing = false;
      syncPlayUI();
      nextTrack(true);
    }
  }
  renderQueue(); // لتحديث أيقونة التشغيل في لوحة القائمة
}

/* ---- تخطّي المقاطع المحظورة للتضمين تلقائياً ---- */
let ytErroredIds = new Set();

function ytErrReason(code) {
  return ({
    2: 'معامل تشغيل غير صالح',
    5: 'خطأ في مشغّل يوتيوب',
    100: 'الفيديو حُذف أو غير موجود',
    101: 'التضمين محظور من صاحب الفيديو',
    150: 'التضمين محظور من صاحب الفيديو'
  })[code] || 'خطأ غير معروف';
}

function onYtError(e) {
  const cur = state.queue[state.index];
  if (!cur || cur.source !== 'youtube') return; // خطأ قديم لم يعد مهمة
  ytErroredIds.add(cur.key);
  state.playing = false;
  syncPlayUI();
  __ytDiag.push('E' + (e && e.data));
  console.log('YT_ERR code=' + (e && e.data) + ' «' + cur.title + '»'); // تشخيص
  // بدل التخطي مباشرةً، نحاول إيجاد نسخة عاملة من الأغنية نفسها من مصادر أخرى
  toast('تعذّر يوتيوب على هذا الاتصال — أبحث عن نسخة عاملة…');
  trySubstitute(cur).then((ok) => {
    if (!ok) {
      toast('تعذّر تشغيل «' + cur.title + '» (' + ytErrReason(e && e.data) + ') — أنتقل للتالي…');
      advancePastBlocked();
    }
  });
}

/* تنظيف العنوان من الوسوم ليصلح للبحث في مصادر أخرى */
function cleanYtTitle(s) {
  return String(s || '')
    .replace(/\(.*?\)|\[.*?\]/g, ' ') // أقواس: (Official Video) [4K]
    .replace(/official\s*(video|audio|music|lyric(?:s)?)|mv|4k|8k|hd|lyrics?|audio\s*only|visualizer|remaster(?:ed)?/gi, ' ')
    .replace(/[-–—|·•]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function scoreMatch(needle, title, artist) {
  const hay = (String(title) + ' ' + String(artist)).toLowerCase();
  const words = String(needle).toLowerCase().split(/\s+/).filter((w) => w.length > 1);
  if (!words.length) return 0;
  let hit = 0;
  for (const w of words) if (hay.includes(w)) hit++;
  return hit / words.length;
}

/* يبحث في المصادر العاملة (Audius/الأرشيف/Openverse) عن نسخة قابلة للتشغيل من الأغنية */
async function trySubstitute(t) {
  if (t.__subbed) return false;
  t.__subbed = true; // منع تكرار البحث لنفس المقطع
  const q = (cleanYtTitle(t.title) + ' ' + t.artist).trim().slice(0, 80) || t.title;
  const settled = await Promise.allSettled([
    audius('/v1/tracks/search?limit=8&query=' + encodeURIComponent(q)),
    previewSearch('searchOpenverse', q, 'openverse'),
    archiveSearch(q)
  ]);
  const get = (i) => (settled[i] && settled[i].status === 'fulfilled') ? settled[i].value : [];
  const cands = [
    ...get(0).map(normAudius),
    ...get(1),
    ...get(2)
  ];
  if (!cands.length) return false;
  // أفضل تطابق حسب العنوان والفنان
  let best = null, bestScore = 0;
  for (const c of cands) {
    const s = scoreMatch(cleanYtTitle(t.title) + ' ' + t.artist, c.title, c.artist);
    if (s > bestScore) { bestScore = s; best = c; }
  }
  if (!best || bestScore < 0.4) return false;
  // استبدال مقطع يوتيوب المحظور بالنسخة العاملة في القائمة
  const idx = state.queue.indexOf(t);
  const wasCurrent = idx === state.index;
  best.__subFrom = t.title;
  if (idx >= 0) state.queue[idx] = best; else state.queue[state.index] = best;
  if (wasCurrent) {
    __ytDiag.push('SUB_' + best.source);
    toast('شغّلت النسخة العاملة من ' + (best.source === 'audius' ? 'Audius' : best.source === 'openverse' ? 'الموسيقى الحرة' : 'الأرشيف') + ' ✓');
    await loadCurrent();
    renderQueue();
    refreshRowHighlights();
  }
  return true;
}

function advancePastBlocked() {
  const n = state.queue.length;
  const canWrap = state.repeat === 'all';
  for (let off = 1; off < n; off++) {
    let j = state.index + off;
    if (j >= n) {
      if (!canWrap) break;
      j %= n;
    }
    const t = state.queue[j];
    if (t.source === 'youtube' && ytErroredIds.has(t.key)) continue;
    state.index = j;
    loadCurrent().then(renderQueue).then(refreshRowHighlights);
    return;
  }
  // لا يوجد مقطع صالح متبقٍ
  __ytDiag.push('ALL_BLOCKED');
  stopYt();
  state.playing = false;
  syncPlayUI();
  const last = state.queue[state.index];
  if (last && last.source === 'youtube') els.npTitle.textContent = last.title + ' — تعذّر التضمين (↗)';
  toast('تعذّر تشغيل الصوت من يوتيوب على هذا الاتصال — جرّب زر ↗ أو شبكة أخرى');
}

function openExternal(url) {
  if (window.sawtify && window.sawtify.openExternal) window.sawtify.openExternal(url);
  else window.open(url, '_blank');
}

els.ytOpenBtn.addEventListener('click', () => {
  const t = state.queue[state.index];
  if (t && t.source === 'youtube') openExternal('https://www.youtube.com/watch?v=' + t.id);
  else toast('شغّل أغنية يوتيوب أولاً');
});

/* مزامنة شريط التقدم مع يوتيوب */
setInterval(() => {
  if (!engineIsYt() || !ytPlayer || !ytPlayer.getCurrentTime) return;
  const d = ytDuration();
  if (!seekDragging && d) {
    const cur = ytPlayer.getCurrentTime() || 0;
    els.seekBar.value = (cur / d) * 100;
    els.curTime.textContent = fmtTime(cur);
    els.durTime.textContent = fmtTime(d);
  }
}, 400);

/* ==================== الثيمات ==================== */
function applyTheme(name) {
  const n = name || 'spotify';
  document.documentElement.setAttribute('data-theme', n);
  store.set('theme', n);
  $$('.swatch').forEach((s) => s.classList.toggle('active', s.dataset.theme === n));
}
$$('.swatch').forEach((s) => {
  s.addEventListener('click', () => { applyTheme(s.dataset.theme); toast('تم تغيير المظهر 🎨'); });
});

/* ==================== التنزيلات (دون اتصال) ==================== */
function findTrackByKey(key) {
  for (const list of Object.values(viewLists)) {
    const hit = list.find((x) => x.key === key);
    if (hit) return hit;
  }
  const inQueue = state.queue.find((x) => x.key === key);
  if (inQueue) return inQueue;
  const d = downloads[key];
  if (d) return { key, title: d.title, artist: d.artist, artwork: d.artwork, duration: d.duration, source: d.source, local: d.path };
  return null;
}

async function downloadTrack(t) {
  if (t.source === 'youtube') { toast('التنزيل غير متاح لمحتوى يوتيوب — يعمل عبر الصوت فقط'); return; }
  if (t.source === 'radio') { toast('البث المباشر لا يمكن تنزيله'); return; }
  if (t.source === 'itunes' || t.source === 'deezer') { toast('المعاينات (30ث) لا تُنزَّل — اختر المصدر الكامل من نفس النتائج'); return; }
  if (!window.sawtify) { toast('التنزيل متاح في نسخة تطبيق سطح المكتب فقط'); return; }
  if (downloads[t.key]) { toast('هذه الأغنية مُنزَّلة مسبقاً ✓'); return; }
  if (t.local) return;
  toast('جارٍ التنزيل…');
  try {
    const url = await downloadSourceUrl(t);
    if (!url) throw new Error('لا يوجد رابط صوتي');
    const res = await window.sawtify.downloadTrack(url, t.artist + ' - ' + t.title + '.mp3');
    if (!res || !res.ok) throw new Error((res && res.error) || 'فشل غير معروف');
    downloads[t.key] = {
      path: res.path, title: t.title, artist: t.artist,
      artwork: t.artwork, duration: t.duration, source: t.source
    };
    store.set('downloads', downloads);
    toast('تم التنزيل ✅ — متاحة الآن دون اتصال');
    refreshDownloadButtons();
    if (state.page === 'downloads') renderDownloads();
  } catch (e) {
    toast('تعذّر التنزيل: ' + e.message);
  }
}

function removeDownload(key) {
  const d = downloads[key];
  if (!d) return;
  delete downloads[key];
  store.set('downloads', downloads);
  if (window.sawtify) window.sawtify.deleteFile(d.path);
  toast('حُذفت الأغنية من التنزيلات');
  refreshDownloadButtons();
  if (state.page === 'downloads') renderDownloads();
}

function refreshDownloadButtons() {
  $$('.dl-btn').forEach((b) => {
    const on = !!downloads[b.dataset.dl];
    b.classList.toggle('done', on);
    b.innerHTML = icon(on ? 'check' : 'download', 18);
    b.title = on ? 'مُنزَّلة — اضغط للحذف' : 'تنزيل للأوفلاين';
  });
  const t = state.queue[state.index];
  const on = !!(t && downloads[t.key]);
  els.dlBtn.classList.toggle('active', on);
  els.dlBtn.innerHTML = icon(on ? 'check' : 'download', 20);
  els.dlBtn.title = on ? 'مُنزَّلة — اضغط للحذف' : 'تنزيل للأوفلاين';
}

function renderDownloads() {
  state.page = 'downloads';
  setActiveNav('downloads');
  state.renderSeq++;
  view.scrollTop = 0;

  const list = Object.entries(downloads).map(([key, v]) => ({
    key, id: String(key).split(':')[1] || key,
    title: v.title, artist: v.artist, artwork: v.artwork,
    duration: v.duration, source: v.source, local: v.path
  }));

  if (!list.length) {
    view.innerHTML = `<div class="page-head"><h1>التنزيلات</h1></div>` +
      emptyState('download', 'لا توجد تنزيلات بعد',
        'اضغط زر التنزيل ⬇ بجانب أي أغنية (أو في شريط المشغل) للاستماع دون اتصال بالإنترنت. تُحفظ الملفات في مجلد Sawtify داخل الملفات الموسيقية.');
    return;
  }

  viewLists.downloadsPage = list;
  view.innerHTML = `
    <div class="page-head"><h1>التنزيلات</h1><p class="muted">${list.length} أغنية متاحة دون اتصال</p></div>
    <div class="pl-actions"><button class="big-play" data-playall="downloadsPage" title="تشغيل الكل">${icon('play', 28)}</button></div>
    <div class="list">${list.map((t, i) => trackRow(t, 'downloadsPage', i)).join('')}</div>`;
}

els.dlBtn.addEventListener('click', () => {
  const t = state.queue[state.index];
  if (!t) { toast('شغّل أغنية أولاً'); return; }
  if (downloads[t.key]) removeDownload(t.key);
  else downloadTrack(t);
});

/* ==================== الإقلاع ==================== */
$$('[data-ic]').forEach((el) => { el.innerHTML = icon(el.dataset.ic, el.closest('.nav-btn') ? 22 : 20); });
applyTheme(store.get('theme', 'spotify'));
refreshDownloadButtons();
syncPlayUI();
syncLikeBtn(null);
syncShuffleUI();
syncRepeatUI();
syncMuteUI();
renderQueue();
renderHome();
