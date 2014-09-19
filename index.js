#!/usr/bin/env node

"use strict"

var http = require("http")
var path = require("path")
var beefy = require("beefy")
var httpFileShare = require("http-file-share")
var portfinder = require("portfinder")

var projectDir = process.cwd()
var projectIndexPath = path.join(projectDir, "index.js")

portfinder.getPort(function (err, port) {
  if (err) throw err

  var beefyHandler = beefy({
    "entries": {
      "/client.js": path.join(__dirname, "client.js"),
      "/index.js": projectIndexPath
    },
    "cwd": __dirname,
    "bundlerFlags": ["--full-paths"]
  })

  var projectBaseRoute = /^\/project/
  var fileShareHandler = httpFileShare(projectDir, projectBaseRoute)
  var server = http.createServer(function (req, res) {
    if (req.url.match(projectBaseRoute)) {
      fileShareHandler(req, res)
    }
    else if (req.url.match(/^\/meta/)) {
      res.writeHead(200, { "Content-type": "application/json" })
      res.end(JSON.stringify({
        "requirePath": projectIndexPath
      }))
    }
    else {
      beefyHandler(req, res)
    }
  })

  server.listen(port, "127.0.0.1")
  console.log("Running application on http://127.0.0.1:"+port+"/")
})
