# babel-plugin-babel-console-plugin

This is a plugin for console!!!

## Example

**In**

```js
// input code
let foo;
```

**Out**

```js
"use strict";

// output code
var foo = undefined;
```

## Installation

```sh
$ npm install babel-plugin-babel-console-plugin
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["babel-console-plugin"]
}
```

### Via CLI

```sh
$ babel --plugins babel-console-plugin script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["babel-console-plugin"]
});
```
