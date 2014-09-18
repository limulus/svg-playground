"use strict"

var JSPlaygroundEditorEvent = module.exports = function (type, jsEditor) {
  this.type = type
  this._jsEditor = jsEditor
  this._documentTextCopy = this._jsEditor.documentText()
}

JSPlaygroundEditorEvent.prototype.editor = function () {
  return this._jsEditor
}

JSPlaygroundEditorEvent.prototype.documentText = function () {
  return this._documentTextCopy
}
