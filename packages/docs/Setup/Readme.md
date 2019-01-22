Setup of the editor is quite straight forward. It is required to be installed from `npm`.

### Installing packages:

Either `npm` or `yarn` commands can be used.

```js static
npm i nib-core --save
```

---

### Writing editor component:

```js static
import React from "react";
import Editor from "nib-core";

const MyEditor = () => <Editor />;
```

---

### Using the editor in a non-react application:

The above written react editor component can be used in non-react code as below:

HTML:

```html static
<div id="editor" />
```

JAVASCRIPT:

```js static
import React from "react";
import ReactDOM from "react-dom";

const MyEditor = () => <Editor />;
ReactDOM.render(<MyEditor />, document.getElementById("editor"));
```
