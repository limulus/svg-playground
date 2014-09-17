"use strict"

var ace = require("brace")
var inherits = require("util").inherits
var EventEmitter = require("events").EventEmitter
var JavaScriptPlaygroundEditorEvent = require("./JavaScriptPlaygroundEditorEvent.js")

// Load in JavaScript highlighter/validator and a nice theme.
require('brace/mode/javascript')
require('brace/theme/monokai')

// We need a setImmediate implementation for browsers that don't support it.
require("setimmediate")

var JavaScriptPlaygroundEditor = module.exports = function (element, documentText) {
  EventEmitter.call(this)

  this._aceEditor = ace.edit(element)
  this._aceEditor.getSession().setMode('ace/mode/javascript')
  this._aceEditor.setTheme('ace/theme/monokai')

  this._initializeWithDocumentText(documentText)

  var session = this._aceEditor.getSession()
  session.on("changeAnnotation", this._handleChangeAnnotationEvent.bind(this))
}
inherits(JavaScriptPlaygroundEditor, EventEmitter)


JavaScriptPlaygroundEditor.prototype._initializeWithDocumentText = function (documentText) {
  this.setDocumentText(documentText)

  if (documentText.initialSelectionsSubstring) {
    this.selectAllForSubstring(documentText.initialSelectionsSubstring())
  }
  else {
    this.clearSelection()
  }
}


JavaScriptPlaygroundEditor.prototype._handleChangeAnnotationEvent = function () {
  if (this.documentContainsNoErrors()) {
    var jseEvent = new JavaScriptPlaygroundEditorEvent("changeValidJS", this)
    setImmediate(this.emit.bind(this, "changeValidJS", jseEvent))
  }
}


JavaScriptPlaygroundEditor.prototype.documentContainsNoErrors = function () {
  var editorAnnotations = this._aceEditor.getSession().getAnnotations()
  var errorAnnotations = editorAnnotations.filter(function (annotation) {
    return annotation.type === "error"
  })
  return errorAnnotations.length === 0
}


JavaScriptPlaygroundEditor.prototype.documentText = function () {
  return this._aceEditor.getValue()
}


JavaScriptPlaygroundEditor.prototype.setDocumentText = function (text) {
  this._aceEditor.setValue(text.toString())
}


JavaScriptPlaygroundEditor.prototype.selectAllForSubstring = function (substring) {
  this._aceEditor.findAll(substring, {}, false)
}


JavaScriptPlaygroundEditor.prototype.clearSelection = function () {
  this._aceEditor.clearSelection()
}
