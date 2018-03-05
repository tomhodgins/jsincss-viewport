# jsincss-viewport

A viewport visibility plugin for jsincss

## About

This plugin is a JavaScript module that works with [JS-in-CSS stylesheets](https://responsive.style/theory/what-is-a-jic-stylesheet.html), to apply styles to an element when it is partly or fully in the browser's viewport vertically.

## Downloading

You can download `index.js` and add it to your codebase, or download it with npm:

```bash
npm install jsincss-viewport
```

Another option that works for building or testing, that isn't ideal for production use, is linking to the module directly from a CDN like unpkg:

```html
<script type=module>
  import viewport from 'https://unpkg.com/jsincss-viewport/index.js'
</script>
```

## Importing

You can import the plugin into your own JavaScript modules in a couple of ways.

The first way is using the native [`import` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) in JavaScript. Here you can assign any name you want to the function you are importing, and you only need to provide a path to the plugin's `index.js` file:

```js
import viewport from './node_modules/jsincss-viewport/index.js'
```

If you want to use `require` to load this plugin instead, and use a bundler like Webpack or Parcel, make sure to add `.default` as you require it:

```js
const viewport = require('jsincss-viewport').default
```

Once you have imported this plugin into your module, you can use the plugin as `viewport()`

## Using JS-in-CSS Stylesheets

The main goal of this plugin is to allow CSS authors the ability to use XPath selectors to select elements and apply a CSS rule to them.

The plugin has the following format:

```js
viewport(selector, option, stylesheet)
```

- `selector` is a string containing an XPath selector
- `option` is a string containing one of the following keywords: `partly`, `fully`
- `stylesheet` is a string or template string containing a CSS stylesheet, where `:self` is a selector that can be used to target the element(s) that pass the test

## Example

This example will use the `jsincss` plugin to load a JS-in-CSS stylesheet making use of this plugin. To test it in a JavaScript module, import both the `jsincss` package and any helper plugins you want:

```js
<script type=module>
  import jsincss from 'https://unpkg.com/jsincss/index.js'
  import viewport from 'https://unpkg.com/jsincss-viewport/index.js'

  jsincss(() => `

    ${viewport('p', 'partly', `
      :self {
        color: red;
      }
    `)}

  `, window, ['load', 'resize', 'scroll'])
</script>
```

It's also possible to write your stylesheets as a separate JavaScript module like this, where you import any helper plugins at the top of the stylesheet:

```js
import viewport from 'https://unpkg.com/jsincss-viewport/index.js'

export default () => `

  ${viewport('p', 'partly', `
    :self {
      color: red;
    }
  `)}

`
```

And then import both the `jsincss` plugin and the stylesheet into your code and run them like this, suppling any `selector` or `events` list the `jsincss` plugin might need to apply the stylesheet only the the element(s) and event(s) you require, depending on what you're doing:

```js
import jsincss from 'https://unpkg.com/jsincss/index.js'
import stylesheet from './path/to/stylesheet.js'

jsincss(stylesheet, window, ['load', 'resize', 'scroll'])
```

## Compatible JS-in-CSS Stylesheet Loaders

- [jsincss](https://github.com/tomhodgins/jsincss)