const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron')
const path = require('node:path')
const { exec } = require('node:child_process')
const Store = require('electron-store').default
const store = new Store()
const {SerialPort} = require('serialport')
SerialPort.list().then(console.log)
let settings = {
    comPort: store.get('comPort') || null,
    filePath: store.get('filePath') || null,
};

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
        icon: path.join(__dirname, 'assets', 'gnx_logo 1.ico')
    })
    const template = [
        {
            label: 'Settings',
            submenu: [
                {
                    label: 'Select COM Port',
                    click: async () => {
                        const ports = await SerialPort.list();

                        if (ports.length === 0) {
                            dialog.showMessageBox(win, {
                                type: 'info',
                                message: 'No COM ports detected.',
                            });
                            return;
                        }

                        const portNames = ports.map((port) => { return {path: port.path, name: port.friendlyName}}); // e.g., ['COM3', 'COM7']

                        const { response } = await dialog.showMessageBox(win, {
                            type: 'question',
                            buttons: [...portNames.map(port=>port.name), 'Cancel'],
                            defaultId: 0,
                            title: 'Select COM Port',
                            message: 'Choose a COM Port:',
                        });

                        if (response < portNames.length) {
                            settings.comPort = portNames[response].path; // e.g. 'COM3'
                            store.set('comPort', settings.comPort);
                            win.webContents.send('settings-updated', settings);
                        }
                    },
                },
                {
                    label: 'Select File Path',
                    click: async () => {
                        const { canceled, filePaths } = await dialog.showOpenDialog(win, {
                            properties: ['openFile'],
                        })

                        if (!canceled && filePaths.length > 0) {
                            settings.filePath = filePaths[0]
                            store.set('filePath', settings.filePath)
                            win.webContents.send('settings-updated', settings)
                        }
                    },
                },
            ],
        },
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
    win.loadFile('index.html')
}

ipcMain.handle('get-settings', () => settings)


ipcMain.handle('run-py', async (event, formData) => {
    const { amount, method } = formData

    try {
        if (!amount || amount === "") {
            return { status: 400, error: "Amount is required." }
        }
        const qr_codes_list = ["QR", "QRPH", "GCASH", "MAYA"]
        if (!method || method === "") {
            return { status: 400, error: "Payment method is required." }
        }
        else if (method !== "CARD" && !qr_codes_list.includes(method)) {
            return { status: 400, error: "Invalid payment method." }
        }
        let params = []
        const terminal_filepath = settings.filePath || store.get('filePath')
        let amt = amount.replace(/\./g, "").replace(/,/g, "")
        let tenderType = ""
        if (method === "CARD") {
            tenderType = "CreditDebit"
        }
        else if (method === "QR") {
            tenderType = "GenericMerchantQR"
        }
        else if (method === "GCASH") {
            tenderType = "GenericMerchantQR --customTenderRequestField \"qr:qrph\""
        }
        else if (method === "MAYA") {
            tenderType = "GenericMerchantQR --customTenderRequestField \"qr:maya\""
        }
        else {
            tenderType = "GenericMerchantQR"
        }

        params.push('-t')
        params.push(settings.comPort) // Assuming com_port holds $config['Config']['paymaya_com_port']
        params.push('-c')
        params.push('SALE')
        params.push(`--amount ${amt}`)
        params.push(`--tender ${tenderType}`)
        if (tenderType === "GenericMerchantQR") {
            params.push('--customTenderRequestField "qr:qrph"')
        }
        params = params.join(' ')
        const script = `python "${terminal_filepath}" ${params}`
        exec(script, { shell: 'powershell.exe' }, (error, stdout) => {
            if (error) {
                console.error(`Error executing command: ${error.message}`)
                return { status: 500, error: "Failed to execute payment command" }
            }
            console.log(`Command output: ${stdout}`)
            return { status: 200, message: "Payment initiated successfully", data: stdout }
        })
    } catch (error) {
        console.error("Error occurred while running Python script:", error)
        return { status: 500, error: `Error: ${error}` }
    }
})



app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})