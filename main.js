'use strict'
const electron = require('electron')
const app = electron.app

const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain
const globalShortcut = electron.globalShortcut;

const database = require('./script/storage')
const request = require('./script/request')
    //const menubar = require('menubar')
    //let mb = menubar()
let windows = []


/*
 * test script start
 */
ipcMain.on('asynchronous-message', function(event, arg) {
    //console.log(arg)  // prints "ping"
    event.sender.send('asynchronous-reply', 'pong')
});
/*
 * test script end
 */


let createWindow = () => {
    windows.push(new BrowserWindow({
        width: 800,
        height: 600
    }))

    const wid = windows.length - 1

    windows[wid].loadURL('file://' + __dirname + '/html/index.html')
    windows[wid].openDevTools()

    windows[wid].on('closed', function() {
        delete windows[wid]
    })
}

app.on('ready', () => {
    globalShortcut.register('CommandOrControl+N', function() {
        createWindow()
    })
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    //createWindow()
})

app.on('will-quit', function() {
    globalShortcut.unregisterAll();
});
