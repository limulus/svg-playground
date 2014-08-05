"use strict"

var JavaScriptPlaygroundEditor = require("./JavaScriptPlaygroundEditor.js")
  , vm = require("vm")

// Require a bunch of modules that we want to make available to 
// the code running in the playground.
require("inherits")
require("svg-create-element")

var JavaScriptPlayground = module.exports = function (playgroundElement, jsStubText, userCodeArgumentsCallback) {
	this._playgroundElem = playgroundElement
    this._userCodeArgumentsCallback = userCodeArgumentsCallback

	var jsEditorElement = document.createElement("div")
    jsEditorElement.style.width = "100%"
    jsEditorElement.style.height = "100%"
	this._playgroundElem.appendChild(jsEditorElement)

	this._jsEditor = new JavaScriptPlaygroundEditor(jsEditorElement, jsStubText)
	this._jsEditor.on("changeValidJS", this._handleJSChange.bind(this))
}

JavaScriptPlayground.prototype._handleJSChange = function (event) {
    var context = {
        "console": window.console,
        "require": require,
        "module": { "exports": {} }
    }

    // Should probably have try blocks around call to runInNewContext and 
    // the apply() of context.module.exports so that we can do something
    // fancy with the error so the user doesn't need to keep the JS
    // console open.
    vm.runInNewContext(event.documentText(), context)
    if (context.module && typeof context.module.exports === "function") {
        var userCodeArguments = this._userCodeArgumentsCallback.call(undefined, context.module.exports)
        context.module.exports.apply(undefined, userCodeArguments)
    }
    else {
        console.error("module.exports not a function")
    }
}

