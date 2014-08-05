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
        'module.exports = function (svgElem) {',
        '    ',
        '};',
        ''
    ].join("\n")
}
