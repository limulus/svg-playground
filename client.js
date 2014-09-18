"use strict"

var SVGPlayground = require("./lib/SVGPlayground.js")

var xhr = require("xhr")

// Async initialization
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializePlayground, false)
}
else {
  initializePlayground()
}

function initializePlayground () {

  xhr({"uri": "/svg-project.json"}, function (err, res, body) {
    if (err) {
      window.alert("Failed to load /svg-project.json")
      return
    }

    var playgroundContainerElem = document.createElement("div")
    playgroundContainerElem.style.height = "500px"
    playgroundContainerElem.style.width = "100%"
    document.body.appendChild(playgroundContainerElem)
    new SVGPlayground(playgroundContainerElem)
  })
}
