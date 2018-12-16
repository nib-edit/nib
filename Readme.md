# EDIT

---

Despite various options available for rich text editing in html, it continues to be extremely challenging area. I found [prosemirror](http://prosemirror.net) to be the best available solution for the problem. It is great work by author [Marijn Haverbeke](http://marijnhaverbeke.nl/).

Making an editor ground up from a framework is still much work, the project aims at building react components for rich text editing using prosemirror. These components can be quickly integrated into react or even ron-react applications.

---

## Setup

Setup of the editor is straight forward. Editor is a package on npm, and toolbars and each plugin is a package of its own and is required to be installed from npm.

### Installing packages:

Either `npm` or `yarn` commands can be used.

```
npm i @edit/core --save
```

### Writing editor component:

```
import React from "react";
import Editor from "@edit/core";

const MyEditor = () => (
  <Editor
    plugins="block inline"
    toolbar="basic"
  />
);
```

---

## Need help

If you have any queries or require any help you can [email](mailto::jyotipuri@gmail.com) me.

---

## License

MIT
