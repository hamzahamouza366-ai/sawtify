const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('sawtify', {
  isDesktop: true,
  downloadTrack: (url, filename) => ipcRenderer.invoke('sawtify:download', { url, filename }),
  deleteFile: (filePath) => ipcRenderer.invoke('sawtify:delete', filePath),
  searchYouTube: (query) => ipcRenderer.invoke('sawtify:ytsearch', query),
  searchItunes: (query) => ipcRenderer.invoke('sawtify:itunes', query),
  searchDeezer: (query) => ipcRenderer.invoke('sawtify:deezer', query),
  searchOpenverse: (query) => ipcRenderer.invoke('sawtify:openverse', query),
  openExternal: (url) => ipcRenderer.invoke('sawtify:openExternal', url)
});
