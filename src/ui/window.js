const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const WINDOW_OPTIONS = {
    width: 1024,
    height: 640,
    resizable: false,
    minimizable: true,
    maximizable: false,
    fullscreenable: false,
    center: true,
    kiosk: true,
    title: 'GistDrive',
    icon: 'icon.ico',
    frame: false,
    darkTheme: true,
    webPreferences: {
        // devTools: false,
        nodeIntegrationInWorker: true,
        preload: true,
    },
};

let win;
let msgQueue = [];
const self = this;
module.exports.create = (onClose) => {
    const createWindow = () => {
        win = new BrowserWindow(WINDOW_OPTIONS);
        // this.win.loadURL(path.join(process.cwd(),'content','index.html'));
        win.loadURL(path.join(__dirname, 'view', 'index.html'));
        win.on('closed', () => { win = null; });
        win.webContents.openDevTools();
        win.webContents.on('did-finish-load', () => {
            msgQueue.forEach((v) => {
                self.request(v.callBack, v.ch, v.params);
            });
            msgQueue = [];
        });
    };
    app.on('ready', createWindow);
    app.on('window-all-closed', () => {
        onClose.call();
        app.quit();
    });
};

const register = (callBack, ch) => {
    if (callBack) {
        ipcMain.on(ch, (ev, ...args) => { callBack(...args); });
    }
};
module.exports.register = register;

module.exports.request = (callBack, ch, ...params) => {
    if (!win) {
        msgQueue.push({ callBack, ch, params });
        return;
    }
    win.webContents.send(ch, params);
    register(callBack, ch);
};

module.exports.response = (ch, ...params) => {
    if (!win) {
        msgQueue.push({ callBack: null, ch, params });
        return;
    }
    win.webContents.send(ch, params);
};
