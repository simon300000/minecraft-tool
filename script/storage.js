'use strict'
const low = require('lowdb')
const storage = require('lowdb/file-sync')
lowDB = low('data/db.json', {
    storage
})
