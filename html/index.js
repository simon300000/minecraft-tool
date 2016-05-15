'use strict'
const content = new ReactiveVar('about') //home
const aboutIn = new ReactiveVar('version')
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

Template.about.helpers({
    versions: () => {
        let versions = []
        for (var x in process.versions) {
            if (process.versions.hasOwnProperty(x) && x != 'modules') {
                versions.push({
                    name: x,
                    version: process.versions[x]
                })
            }
        }
        return versions
    },
    inVersion: () => {
        if (aboutIn.get() == 'version') {
            return 'active'
        }
    },
    inModule: () => {
        if (aboutIn.get() == 'module') {
            return 'active'
        }
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



Template.about.events({
    'mousedown .tab-item': (e) => {
        if (e.button === 0) {
            aboutIn.set(e.currentTarget.attributes.data.value)
        }
    }
});

Template.main.events({
    'mousedown .nav-group-item': (e) => {
        if (e.button === 0) {
            content.set(e.currentTarget.attributes.data.value)
        }
    }
});


/* jshint -W117 */
