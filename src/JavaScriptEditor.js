"use strict"

var ace = require("brace")
  , inherits = require("util").inherits
  , EventEmitter = require("events").EventEmitter

// Load in JavaScript highlighter/validator and a nice theme.
require('brace/mode/javascript')
require('brace/theme/monokai')

var JavaScriptEditor = module.exports = function (element) {
    this._aceEditor = ace.edit(element)
    this._aceEditor.getSession().setMode('ace/mode/javascript')
    this._aceEditor.setTheme('ace/theme/monokai')

	this._aceEditor.setValue([
	    'module.exports = function (svgElem) {',
	    '    ',
	    '};',
        ''
	  ].join('\n')
	);
	this._aceEditor.clearSelection();

	this._aceEditor.getSession().on("changeAnnotation", function (event) {
        if (this.documentContainsNoErrors()) {
            var jseEvent = new JavaScriptEditorEvent("changeValidJS", this)
            this.emit("changeValidJS", jseEvent)
        }
    }.bind(this))
}
inherits(JavaScriptEditor, EventEmitter)

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


var JavaScriptEditorEvent = function (type, jsEditorObject) {
    this.type = type
    this._jsEditorContext = jsEditorObject
}

JavaScriptEditorEvent.prototype.editor = function () {
    return this._jsEditorContext
}
