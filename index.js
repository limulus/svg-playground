var JavaScriptPlayground = require("./src/JavaScriptPlayground.js")
  , svgCreateElement = require("svg-create-element")

// Async initialization
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializePlayground, false)
}
else {
    initializePlayground()
}

function initializePlayground () {
    var svgContainerElem = document.createElement("div")
    svgContainerElem.style.width = "50%"
    svgContainerElem.style.height = "400px"
    svgContainerElem.style.float = "left"
    document.body.appendChild(svgContainerElem)

    var playgroundElem = document.createElement("div")
    playgroundElem.style.width = "50%"
    playgroundElem.style.height = "400px"
    playgroundElem.style.float = "left"
    document.body.appendChild(playgroundElem)

    var generateUserCodeArguments = function () {
        var svgRoot = svgCreateElement("svg")
        removeAllChildNodes(svgContainerElem)
        svgContainerElem.appendChild(svgRoot)
        return [svgRoot]
    }

    new JavaScriptPlayground(playgroundElem, jsStubText(), generateUserCodeArguments)
}

function removeAllChildNodes (element) {
    while (element.lastChild) {
        element.removeChild(element.lastChild)
    }
}

function jsStubText () {
    return [
        'var createElement = require("svg-create-element")',
        '',
        'module.exports = function (svgRootElement) {',
        '    ',
        '}',
        ''
    ].join("\n")
}
