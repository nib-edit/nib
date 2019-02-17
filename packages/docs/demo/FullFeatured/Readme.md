Editor with all top toolbar options enabled.

```js
<FullFeatured />
```

Code:

```js static
import React, { PureComponent } from "react";
import Editor from "nib-core";

import uploadCallback from "../../common/uploadCallback";

class FullFeatured extends PureComponent {
  render() {
    return (
      <Editor
        config={{
          plugins: {
            image: {
              uploadCallback
            }
          },
          toolbar: {
            options: "top"
          }
        }}
        onChange={this.onChange}
      />
    );
  }
}

export default FullFeatured;
```
