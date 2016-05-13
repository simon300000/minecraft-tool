'use strict'

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
//const menubar = require('menubar')
//let mb = menubar()
let windows = []

let createWindow = (a, b, c, d, e, f) => {
    windows.push(new BrowserWindow({
        width: 800,
        height: 600
    }))

    const wid = windows.length - 1

    windows[wid].loadURL('file://' + __dirname + '/html/index.html')


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
