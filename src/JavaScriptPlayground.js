"use strict"

var JavaScriptPlaygroundEditor = require("./JavaScriptPlaygroundEditor.js")
  , vm = require("vm")

var JavaScriptPlayground = module.exports = function (playgroundElement, jsStubText) {
	this._playgroundElem = playgroundElement

	var jsEditorElement = document.createElement("div")
    jsEditorElement.style.width = "100%"
    jsEditorElement.style.height = "100%"
	this._playgroundElem.appendChild(jsEditorElement)

	this._jsEditor = new JavaScriptPlaygroundEditor(jsEditorElement, jsStubText)
	this._jsEditor.on("changeValidJS", this._handleJSChange.bind(this))
}

JavaScriptPlayground.prototype._handleJSChange = function (event) {
    try {
        var result = vm.runInNewContext(event.documentText(), {
            "require": require,
            "module": { "exports": {} }
        })
        result("bar")
    }
    catch (e) {
        console.log(e)
    }
}

