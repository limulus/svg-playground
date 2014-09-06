#!/usr/bin/env node

"use strict"

var http = require("http")
var beefy = require("beefy")
var portfinder = require("portfinder")

portfinder.getPort(function (err, port) {
    if (err) throw err

    var server = http.createServer(beefy({
        "entries": ["./client.js"],
        "cwd": __dirname
    }))

    server.listen(port, "127.0.0.1")
    console.log("Running application on http://127.0.0.1:"+port+"/")
})
