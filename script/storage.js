'use strict'
const low = require('lowdb')
const storage = require('lowdb/file-sync')
module.exports = low('data.json', {
    storage
})
