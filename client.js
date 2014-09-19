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
  playgroundContainerElem.style.height = "500px"
  playgroundContainerElem.style.width = "100%"
  document.body.appendChild(playgroundContainerElem)
  new SVGPlayground(playgroundContainerElem)
}
