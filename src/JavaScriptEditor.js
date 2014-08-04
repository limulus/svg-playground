"use strict"

var ace = require("brace")
  , inherits = require("util").inherits
  , EventEmitter = require("events").EventEmitter
  , JavaScriptEditorEvent = require("./JavaScriptEditorEvent.js")

// Load in JavaScript highlighter/validator and a nice theme.
require('brace/mode/javascript')
require('brace/theme/monokai')

// We need a setImmediate implementation for browsers that don't support it.
require("setimmediate")

var JavaScriptEditor = module.exports = function (element, documentText) {
    this._aceEditor = ace.edit(element)
    this._aceEditor.getSession().setMode('ace/mode/javascript')
    this._aceEditor.setTheme('ace/theme/monokai')

	this._aceEditor.setValue(documentText);
	this._aceEditor.clearSelection();

	var session = this._aceEditor.getSession()
    session.on("changeAnnotation", this._handleChangeAnnotationEvent.bind(this))
}
inherits(JavaScriptEditor, EventEmitter)

JavaScriptEditor.prototype._handleChangeAnnotationEvent = function () {
    if (this.documentContainsNoErrors()) {
        var jseEvent = new JavaScriptEditorEvent("changeValidJS", this)
        setImmediate(function () {
            this.emit("changeValidJS", jseEvent)
        }.bind(this))
    }
}

JavaScriptEditor.prototype.documentContainsNoErrors = function () {
    var editorAnnotations = this._aceEditor.getSession().getAnnotations()
    var errorAnnotations = editorAnnotations.filter(function (annotation) {
        return annotation.type === "error"
    })
    return errorAnnotations.length === 0   
}

JavaScriptEditor.prototype.documentText = function () {
    return this._aceEditor.getValue()
}

