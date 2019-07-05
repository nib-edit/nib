The editor can be used as full page editor with some style changes.

```js
<FullPage />
```

Code:

```js static
import React, {useState} from "react";
import Editor from "nib-core";

import uploadCallback from "../../common/uploadCallback";

const theme = {
  wrapper: {
    height: "100%",
    width: "100%"
  },
  editor: {
    height: "calc(100% - 46px)",
    width: "100%"
  }
};

// Wrap FullPage in a component occupying whole screen.
const FullPage = () => {
  const [content, setContent] = useState({});
  return (
    <div>
      <div style={{height: 500}} />
      <Editor
        config={{
          plugins: {
            image: {
              uploadCallback
            }
          }
        }}
        onChange={setContent}
        theme={theme}
      />
      <pre>{JSON.stringify(content, null, 4)}</pre>
    </div>
  );
};
```
