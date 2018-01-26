'use strict';

const {app, BrowserWindow} = require('electron');
const path = require('path');

const WINDOW_OPTIONS = {
    width: 1024,
    height: 640,
    resizable: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    center:true,
    kiosk: true,
    title: "GistDrive",
    //icon: TODO,
    frame: false,
    //backgroundColor: TODO,
    darkTheme: true,
    webPreferences:{
        // devTools: false,
        nodeIntegrationInWorker: true,
        preload: true,
    },
}

class Window{
    constructor(onClose){
        this.win = null;
        app.on('ready',this.createWindow);
        app.on('window-all-closed', ()=>{
            onClose.call();
            app.quit();
        });
        app.on('active',()=>{
            if(this.win === null){
                this.createWindow();
            }
        });
    }

    createWindow(){
        this.win = new BrowserWindow(WINDOW_OPTIONS);
        this.win.loadURL(path.join(process.cwd(),'content','index.html'));
        this.win.on('closed', ()=>{this.win = null});
        this.win.webContents.openDevTools();
    }

}

module.exports = Window;

