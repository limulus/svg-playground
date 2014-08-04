var vm = require("vm")
  , JavaScriptEditor = require("./src/JavaScriptEditor.js")

window.addEventListener("DOMContentLoaded", function () {
    var editorElem = document.getElementById("javascript-editor")
      , editor = new JavaScriptEditor(editorElem, initialDocumentText)

    editor.on("changeValidJS", function (e) {
        var result = vm.runInNewContext(e.documentText(), {
            "require": require,
            "module": { "exports": {} }
        })

        try {
            result("bar")
        }
        catch (e) {
            console.log(e.stack)
        }
    })
}, false)


var initialDocumentText = [
    'module.exports = function (svgElem) {',
    '    ',
    '};',
    ''
].join("\n")
