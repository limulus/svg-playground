"use strict"

var JavaScriptEditorEvent = module.exports = function (type, jsEditor) {
    this.type = type
    this._jsEditor = jsEditor
    this._documentTextCopy = this._jsEditor.documentText()
}

JavaScriptEditorEvent.prototype.editor = function () {
    return this._jsEditor
}

JavaScriptEditorEvent.prototype.documentText = function () {
    return this._documentTextCopy
}
