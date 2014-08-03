var vm = require("vm")
  , JavaScriptEditor = require("./src/JavaScriptEditor.js")

window.addEventListener("DOMContentLoaded", function () {
    var editorElem = document.getElementById("javascript-editor")
      , editor = new JavaScriptEditor(editorElem)

    editor.on("changeValidJS", function (e) {
        var result = vm.runInNewContext(e.editor().documentText(), {
            "require": require,
            "module": { "exports": {} }
        })

        result("bar")
    })
}, false)


