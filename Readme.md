# NIB

## [Demo](http://www.nibedit.com)

Despite various options available for rich text editing in html, it continues to be extremely challenging area. I found [prosemirror](http://prosemirror.net) to be the best available solution for the problem. It is great work by author [Marijn Haverbeke](http://marijnhaverbeke.nl/).

Making an editor ground up from a framework is still much work, the project aims at building components for rich text editing using prosemirror. These components can be quickly integrated into react or even ron-react applications.

## Setup

Setup of the editor is quite straight forward. It is required to be installed from `npm`.

### Installing packages:

Either `npm` or `yarn` commands can be used.

```
npm i nib-core --save
```

### Writing editor component:

```
import React from "react";
import Editor from "nib-core";

const MyEditor = () => <Editor />;
```

## Props

Props supported by the editor.

| S.No. | Name         | Description                                                                                                                                                                                  |
| ----- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | blockStyles  | Style of variuos blocks used in the editor, [here](https://github.com/jpuri/Nib/blob/master/packages/core/src/components/Editor/blockStyles.js#L1) are the defaults which can be overridden. |
| 2     | defaultValue | Value to initialize editor content                                                                                                                                                           |
| 3     | onChange     | Callback which is called when the content of the editor changes                                                                                                                              |
| 4     | config       | Configuring the plugin toolbar etc in editor, [here](https://github.com/jpuri/Nib/blob/master/packages/core/src/common/config/index.js) are default configurations which can be overridden.  |
| 5     | spellcheck   | Boolean property to enable default browser spellcheck in the editor.                                                                                                                         |
| 6     | theme        | Theming of the editor, [here](https://github.com/jpuri/Nib/blob/master/packages/core/src/components/Editor/theme.js) is default theme which can be overridden.                               |

Editor is in initial phase of development and right now api is not stable.

## License

Nib is available under different licenses for commercial and non-commercial purposes [details](http://www.nibedit.com/index.html#/License).
