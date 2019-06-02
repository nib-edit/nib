Editor with all top toolbar options enabled.

```js
<FullFeatured />
```

Code:

```js static
import React, {useState} from "react";
import Editor from "nib-core";

import uploadCallback from "../../common/uploadCallback";

const FullFeatured = () => {
  const [content, setContent] = useState({});
  return (
    <div>
      <Editor
        config={{
          plugins: {
            image: {
              uploadCallback
            }
          }
        }}
        onChange={setContent}
      />
      <pre>{JSON.stringify(content, null, 4)}</pre>
    </div>
  );
};
```
