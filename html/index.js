'use strict'
const content = new ReactiveVar('home')
const aboutIn = new ReactiveVar('version')
const electron = require('electron')
const ipcRenderer = electron.ipcRenderer
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

let currentContent = (current) => content.get() === current

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
    inVersion: () => aboutIn.get() == 'version' && 'active',
    inModule: () => aboutIn.get() == 'module' && 'active',
    inElectronModule: () => aboutIn.get() == 'electronModule' && 'active',
    modules: () => aboutIn.get() == 'module' && process.moduleLoadList.map((x) => ({
        type: x.split(' ')[0],
        name: x.split(' ')[1]
    })) || electron.remote.process.moduleLoadList.map((x) => ({
        type: x.split(' ')[0],
        name: x.split(' ')[1]
    }))
});

let whatContent = {
    isHome: () => currentContent('home') && 'active',
    isSkin: () => currentContent('skin') && 'active',
    isConfig: () => currentContent('config') && 'active',
    isAbout: () => currentContent('about') && 'active'
}

Template.main.helpers(whatContent);

Template.content.helpers(whatContent);



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
