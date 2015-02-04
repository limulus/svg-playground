# SVG Playground

Play, create and collaborate on parametric SVG images generated using JavaScript.


## Synopsis

This app is meant to be installed as a dependency of a project of your own. When opened in the browser, it looks like this:

![Screenshot of SVG Playground](http://www.limulus.net/projects/svg-playground/screenshot.png?1)

When you update the code on the right, and the code is able to compile, the SVG is immediately updated on the left.


## Installation

```shell
npm install svg-playground
```


## Running

```shell
node node_modules/svg-playground/index.js
```

Using the `--open` flag will cause your default browser to open the application. You might like to have this command be your `npm start` script for your project.


## Using

When you change your JS code not only do your changes immediately appear in the rendered SVG, they are saved to disk.

When you've got an SVG that you like, you can export it with Command-E (or Ctrl-E) from the editor. It will open in a new window, allowing you to save the source.


## See Also

You might like [vecs](https://www.npmjs.com/package/vecs), a lightweight SVG library in its infancy.
