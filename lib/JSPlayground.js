"use strict"

var JSPlaygroundEditor = require("./JSPlaygroundEditor.js")
var vm = require("vm")
var xhr = require("xhr")
var assert = require("assert")

// Require a bunch of modules that we want to make available to
// the code running in the playground.
require("inherits")
require("svg-create-element")

var JSPlayground = module.exports = function (playgroundElement, userCodeArgumentsCallback) {
  this._playgroundElem = playgroundElement
  this._userCodeArgumentsCallback = userCodeArgumentsCallback

  var jsEditorElement = document.createElement("div")
  jsEditorElement.style.width = "100%"
  jsEditorElement.style.height = "100%"
  this._playgroundElem.appendChild(jsEditorElement)

  xhr({"uri": "/meta"}, function (err, res, body) {
    this._meta = JSON.parse(body)
    xhr({"uri": "/project/index.js"}, function (err, res, body) {
      assert.ifError(err)
      this._jsEditor = new JSPlaygroundEditor(jsEditorElement, body)
      this._jsEditor.on("changeValidJS", this._handleJSChange.bind(this))
    }.bind(this))
  }.bind(this))
}

JSPlayground.prototype._handleJSChange = function (event) {
  xhr({
    "method": "PUT",
    "uri": "/project/index.js",
    "body": event.documentText()
  }, function (err) {
    assert.ifError(err)

    xhr({"uri": "/index.js"}, function (err, res, body) {
      assert.ifError()

      // Should probably have try blocks around call to runInNewContext and
      // the apply() of context.module.exports so that we can do something
      // fancy with the error so the user doesn't need to keep the JS
      // console open.
      var _require = eval(body)
      if (_require && typeof _require === "function") {
        var userCodeArguments = this._userCodeArgumentsCallback.call(undefined, module)
        var module = _require(this._meta.requirePath)
        module.apply(undefined, userCodeArguments)
      }
      else {
        console.error("_require not a function")
      }
    }.bind(this))
  }.bind(this))
}
