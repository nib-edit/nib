Basic editor with only text editing enabled.

```js
<Basic />
```

Code:

```js static
import React, {useState} from "react";
import Editor from "nib-core";

const Basic = () => {
  const [content, setContent] = useState({});
  return (
    <div>
      <Editor
        config={{
          plugins: {options: ""},
          toolbar: {options: ""}
        }}
        onChange={setContent}
      />
      <pre>{JSON.stringify(content, null, 4)}</pre>
    </div>
  );
};
```
