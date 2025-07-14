const port = document.getElementById('com-port');
const terminal = document.getElementById('file-path');
const btn = document.getElementById('btn')

btn.addEventListener('click', ()=>{
    window.api.runScript({amount:"100", method: "GCASH"});
})

window.settingsAPI.getSettings().then((settings) => {
    console.log("Current settings:", settings);
    port.textContent = settings.comPort || "Not selected";
    terminal.textContent = settings.filePath || "Not selected";
})

window.settingsAPI.onSettingsUpdated((newSettings) => {
    console.log("Settings updated:", newSettings);
    port.textContent = newSettings.comPort || "Not selected";
    terminal.textContent = newSettings.filePath || "Not selected";
})

