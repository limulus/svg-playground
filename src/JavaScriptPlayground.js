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
    var context = {
        "require": require,
        "module": { "exports": {} }
    }

    // Should probably have a try block around this and 
    // do something fancy with the error so the user 
    // doesn't need to keep the JS console open.
    vm.runInNewContext(event.documentText(), context)
    if (context.module && typeof context.module.exports === "function") {
        context.module.exports.call(undefined, "bar")
    }
    else {
        console.error("module.exports not a function")
    }
}

