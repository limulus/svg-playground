var JavaScriptPlayground = require("./src/JavaScriptPlayground.js")

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializePlayground, false)
}
else {
    initializePlayground()
}

function initializePlayground () {
    var playgroundElem = document.getElementById("javascript-playground")
    new JavaScriptPlayground(playgroundElem, jsStubText())
}

function jsStubText () {
    return [
        'var createElement = require("svg-create-element")',
        '',
        'module.exports = function (svgRootElement) {',
        '    ',
        '};',
        ''
    ].join("\n")
}
