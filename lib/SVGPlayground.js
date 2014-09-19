"use strict"

var JSPlayground = require("./JSPlayground.js")
var SVGPlaygroundJSTemplate = require("./SVGPlaygroundJSTemplate.js")
var svgCreateElement = require("svg-create-element")


var SVGPlayground = module.exports = function (playgroundContainerElem) {
  this._playgroundContainerElem = playgroundContainerElem

  this._svgContainerElem = document.createElement("div")
  this._svgContainerElem.style.width = "50%"
  this._svgContainerElem.style.height = "100%"
  this._svgContainerElem.style.float = "left"
  this._playgroundContainerElem.appendChild(this._svgContainerElem)

  this._playgroundElem = document.createElement("div")
  this._playgroundElem.style.width = "50%"
  this._playgroundElem.style.height = "100%"
  this._playgroundElem.style.float = "left"
  this._playgroundContainerElem.appendChild(this._playgroundElem)

  this._jsPlayground = new JSPlayground(
    this._playgroundElem,
    this._generateUserCodeArguments.bind(this)
  )
}


SVGPlayground.prototype._generateUserCodeArguments = function () {
  var svgRoot = svgCreateElement("svg")
  removeAllChildNodes(this._svgContainerElem)
  this._svgContainerElem.appendChild(svgRoot)
  return [svgRoot]
}


function removeAllChildNodes (element) {
  while (element.lastChild) {
    element.removeChild(element.lastChild)
  }
}
