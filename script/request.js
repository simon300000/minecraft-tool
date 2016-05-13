'use strict'
const http = require('http')
const fs = require('fs')
const request = require('request')
module.exports.download = (url) => new Promise((r, j) => {
    request(url, {
        encoding: null
    }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            r(body.toString('base64'))
        } else if (response.statusCode == 404) {
            r(response.statusCode)
        }
    })
})
