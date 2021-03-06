'use strict';

const electron = require('electron');
//发布后由electron启动后台http服务
//const server = require('../server/app.js');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    console.log(process.resourcesPath + '/ripple.ico');
    mainWindow = new BrowserWindow({
        //show: false,
        width: 1200,
        height: 800,
        icon: process.resourcesPath + '/ripple.ico',
        backgroundColor: '#2e2c29'
    });

    // and load the index.html of the app.
    mainWindow.loadURL('http://localhost:3618');

    // Open the DevTools.
    //mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    });
    //https://stackoverflow.com/questions/32402327/how-can-i-force-external-links-from-browser-window-to-open-in-a-default-browser/32427579#32427579
    mainWindow.webContents.on('new-window', function(e, url) {//界面中点击url，使用系统默认浏览器打开
        e.preventDefault();
        require('electron').shell.openExternal(url);
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
