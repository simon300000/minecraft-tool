'use strict'

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const database = require('./script/storage')
const ipcMain = require('electron').ipcMain
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


let createWindow = (a, b, c, d, e, f) => {
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

app.on('ready', () => app.emit('activate'))

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    createWindow()
})
