Editor with block formatting and inline formatting options available.

```js
<BlockInline />
```

Code:

```js static
import React from "react";
import Editor from "@edit/core";

const EditorWithBlockInline = () => (
  <Editor plugins="block inline" toolbar="basic" />
);
```
