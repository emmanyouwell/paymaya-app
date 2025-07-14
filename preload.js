const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // we can also expose variables, not just functions
})

contextBridge.exposeInMainWorld('api', {
  runScript: (params) => ipcRenderer.invoke('run-py', params)
})

contextBridge.exposeInMainWorld('settingsAPI', {
  getSettings: () => ipcRenderer.invoke('get-settings'),
  onSettingsUpdated: (callback) => ipcRenderer.on('settings-updated', (e, data) => {
    callback(data)
  })
})