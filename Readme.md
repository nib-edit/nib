# NIB

## [Demo](http://www.nibedit.com)

Despite various options available for rich text editing in html, it continues to be extremely challenging area. I found [prosemirror](http://prosemirror.net) to be the best available solution for the problem. It is great work by author [Marijn Haverbeke](http://marijnhaverbeke.nl/).

Making an editor ground up from a framework is still much work, the project aims at building components for rich text editing using prosemirror. These components can be quickly integrated into react or even non-react applications.

![Editor image](https://i.imgur.com/WyM2rzq.png)

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

| S.No. | Name         | Description                                                                                                                                                      |
| ----- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | addons       | array of plugins for adding functionality to core editor                                                                                                         |
| 2     | autoFocus    | to focus editor by default                                                                                                                                       |
| 3     | config       | configuring the plugin, toolbar etc in editor, [here](https://github.com/nib-edit/Nib/blob/master/packages/core/src/config/editor.js) are default configurations |
| 4     | defaultValue | value to initialize editor content                                                                                                                               |
| 5     | licenseKey   | license key for nib editor                                                                                                                                       |
| 6     | onChange     | callback which is called on any change in the editor                                                                                                             |
| 7     | spellCheck   | boolean property to enable default browser spellCheck in the editor                                                                                              |
| 8     | styleConfig  | used to do more detailed style changes in the editor, [here](https://github.com/nib-edit/Nib/blob/master/packages/core/src/config/styles.js) is the default      |
| 9     | theme        | theming of the editor, [here](https://github.com/nib-edit/Nib/blob/master/packages/core/src/config/theme.js) is default theme                                    |

## License

MIT
<br/>
This repository includes code for all basic editor features which are freely available. Advance editor features like nib drive, tables, advance images, video, tracking changes, comments and collaborative editing are not open source.
