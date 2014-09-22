"use strict"

var SVGPlayground = require("./lib/SVGPlayground.js")

// Async initialization
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializePlayground, false)
}
else {
  initializePlayground()
}

function initializePlayground () {
  var playgroundContainerElem = document.createElement("div")
  playgroundContainerElem.style.height = "100%"
  playgroundContainerElem.style.width = "100%"
  playgroundContainerElem.style.position = "absolute"
  document.body.appendChild(playgroundContainerElem)
  new SVGPlayground(playgroundContainerElem)
}
