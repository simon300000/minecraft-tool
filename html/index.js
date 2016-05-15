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
let content = new ReactiveVar('home')

Template.about.helpers({
    versions: () => {
        let versions = []
        for (var x in process.versions) {
            if (process.versions.hasOwnProperty(x)) {
                versions.push({
                    name: x,
                    version: process.versions[x]
                })
            }
        }
        return versions
    }
});

Template.main.helpers({
    home: () => {
        if (content.get() == 'home') {
            return 'active'
        }
    },
    config: () => {
        if (content.get() == 'config') {
            return 'active'
        }
    },
    about: () => {
        if (content.get() == 'about') {
            return 'active'
        }
    }
});

Template.content.helpers({
    isHome: () => {
        return content.get() == 'home'
    },
    isConfig: () => {
        return content.get() == 'config'
    },
    isAbout: () => {
        return content.get() == 'about'
    }
});



Template.main.events({
    'mousedown .home': (e) => {
        content.set('home')
    },
    'mousedown .config': (e) => {
        content.set('config')
    },
    'mousedown .about': (e) => {
        content.set('about')
    }
});


/* jshint -W117 */
