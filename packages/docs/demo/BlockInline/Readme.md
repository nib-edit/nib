Editor with block and inline formatting options available.

```js
<BlockInline />
```

Code:

```js static
import React, {useState} from "react";
import Editor from "nib-core";

const BlockInline = () => {
  const [content, setContent] = useState();
  return (
    <div>
      <Editor
        config={{
          plugins: {options: "block inline list"},
          toolbar: {options: "top", top: {options: "block inline list"}}
        }}
        onChange={setContent}
      />
      <pre>{JSON.stringify(content, null, 4)}</pre>
    </div>
  );
};
```
