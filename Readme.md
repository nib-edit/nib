# NIB

## [Demo](http://www.nibedit.com)

Despite various options available for rich text editing in html, it continues to be extremely challenging area. I found [prosemirror](http://prosemirror.net) to be the best available solution for the problem. It is great work by author [Marijn Haverbeke](http://marijnhaverbeke.nl/).

Making an editor ground up from a framework is still much work, the project aims at building components for rich text editing using prosemirror. These components can be quickly integrated into react or even non-react applications.

Nib not only has good rich text editing capabilities but also addresses complex editing requirements like tracking changes made to a document, adding comments in document, collaborative editing and more...

![Editor image](https://i.imgur.com/WyM2rzq.png)

## Setup

Setup of the editor is quite straight forward. It is required to be installed from `npm`.

#### Installing packages:

Either `npm` or `yarn` commands can be used.

```
npm i nib-core --save
```

#### Writing editor component:

```
import React from "react";
import Editor from "nib-core";

const MyEditor = () => <Editor />;
```

Please note that the lib does not work server side.

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

## Features

1. Support for almost all browsers and devices
2. Multiple rich text styling options like bold, italic, underline, strike, subscript, superscript, text color, filll color, etc
3. Support for different block types paragraph, h1 - h6, blockquote etc
4. Support for hyperlinks
5. Support for nested ordered and unordered lists
6. Support for images with options like wrapping, aligning, re-sizing or linking images
7. Support for inline mode with floating toolbar
8. Support for customized display - full page, word like display, etc
9. Allow undo and redo changes.
10. Help menu that display supported formatting options and their keyboard shortcuts
11. Changing look and feel of editor using different themes
12. Convert prosemirror JSON to and from markdown
13. Convert prosemirror JSON to and from HTML
14. Source code editing
15. Table with advance options like add/remove column/row, resize columns, etc
16. Support for displaying video from sources like Youtube or Vimeo
17. Flexibility to add custom plugin
18. Track changes make of document along with any metadata saved about the change like username, timestamp, etc
19. Adding / editing comments to document
20. Collaborative editing with multiple users on same document

## License

GNU GENERAL PUBLIC LICENSE.

## Contact

For details or queries drop mail to jyotipuri@gmail.com.
