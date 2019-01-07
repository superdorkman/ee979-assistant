const { ipcRenderer } = window.require('electron');

export const openUrl = url => {
  ipcRenderer.send('shell:openExternal', url);
}