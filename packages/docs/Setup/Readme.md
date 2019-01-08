Setup of the editor is quite straight forward. Toolbar and each plugin is a package of its own and is required to be installed from `npm`.

## Installing packages:

Either `npm` or `yarn` commands can be used.

```js static
npm i nib-core --save
```

## Writing editor component:

```js static
import React from "react";
import Editor from "nib-core";

const MyEditor = () => (
  <Editor
    plugins="block inline"
    toolbar={{ htop: { options: "block inline" } }}
  />
);
```

## Using the editor in a non-react application:

The above written react editor component can be used in non-react code as below:

HTML:

```html static
<div id="editor" />
```

JAVASCRIPT:

```js static
import React from "react";
import ReactDOM from "react-dom";

const MyEditor = () => <Editor plugins="block inline" {{ htop:  { options: "block inline"} }} />;
ReactDOM.render(<MyEditor />, document.getElementById("editor"));
```
