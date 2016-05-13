'use strict'
const ipcRenderer = require('electron').ipcRenderer
/*
* test script start
*/
ipcRenderer.on('asynchronous-reply', function(event, arg) {
  console.log(arg)
});
ipcRenderer.send('asynchronous-message', 'ping')
/*
* test script end
*/
