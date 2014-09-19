"use strict"

var SVGPlaygroundJSTemplate = module.exports = function () {
  this._text = [
    'var createElement = require("svg-create-element")',
    '',
    'var ModuleName = module.exports = function (svg) {',
    '  ',
    '}',
    '',
    'ModuleName.prototype.name = function () { return "ModuleName" }',
    ''
  ].join("\n")
}

SVGPlaygroundJSTemplate.prototype.toString = function () {
  return this._text
}

SVGPlaygroundJSTemplate.prototype.initialSelectionsSubstring = function () {
  return "ModuleName"
}
