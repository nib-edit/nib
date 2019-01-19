Editor with all options enabled.

```js
<FullFeatured />
```

Code:

```js static
import React, { PureComponent } from "react";
import Editor from "nib-core";

class FullFeatured extends PureComponent {
  render() {
    return (
      <Editor
        config={{
          toolbar: {
            options: "top"
          }
        }}
      />
    );
  }
}

export default FullFeatured;
```
