const { app, BrowserWindow, shell, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1100,
        height: 750,
        minWidth: 850,
        minHeight: 600,
        title: "TuxPass - Bóveda & Generador de Contraseñas",
        icon: path.join(__dirname, 'icon.ico'),
        backgroundColor: '#0c0f12',
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true
        }
    });

    mainWindow.loadFile('index.html');

    // Open external links in default OS browser
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
