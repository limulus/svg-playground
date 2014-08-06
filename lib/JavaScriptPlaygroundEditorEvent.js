"use strict"

var JavaScriptPlaygroundEditorEvent = module.exports = function (type, jsEditor) {
    this.type = type
    this._jsEditor = jsEditor
    this._documentTextCopy = this._jsEditor.documentText()
}

JavaScriptPlaygroundEditorEvent.prototype.editor = function () {
    return this._jsEditor
}

JavaScriptPlaygroundEditorEvent.prototype.documentText = function () {
    return this._documentTextCopy
}
