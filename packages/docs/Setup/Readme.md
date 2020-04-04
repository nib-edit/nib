### Installing package

Package can be installed using npm or yarn commands

```js static
npm i nib-core --save
yarn add nib-core
```

<br />
<br />

### Writing editor component

```js static
import React from 'react';
import Editor from 'nib-core';

const MyEditor = () => <Editor />;
```

<br />
<br />

### Using nib editor in a non-react application

Nib editor component can be used in non-react code as below:

HTML:

```html static
<div id="editor" />
```

<br />

JAVASCRIPT:

```js static
import React from 'react';
import ReactDOM from 'react-dom';

const MyEditor = () => <Editor />;
ReactDOM.render(<MyEditor />, document.getElementById('editor'));
```

<br />

Props as detailed [here](http://www.nibedit.com/index.html#/Props) can be used to configure / customise editor behaviour.
