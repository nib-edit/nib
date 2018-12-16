Editor with list option enabled.

```js
<Lists />
```

Code:

```js static
import React from "react";
import Editor from "@edit/core";

const EditorWithLists = () => (
  <Editor plugins="block inline list" toolbar="basic" />
);
```
