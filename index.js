var JavaScriptPlayground = require("./src/JavaScriptPlayground.js")

window.addEventListener("DOMContentLoaded", function () {
    var playgroundElem = document.getElementById("javascript-playground")
    new JavaScriptPlayground(playgroundElem, jsStubText())
}, false)


function jsStubText () {
    return [
        'module.exports = function (svgElem) {',
        '    ',
        '};',
        ''
    ].join("\n")
}
