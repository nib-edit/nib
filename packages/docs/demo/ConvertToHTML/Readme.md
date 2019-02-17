Convert content to HTML string.

```js
<ConvertToHTMLDemo />
```

Code:

```js static
import Editor from "nib-core";
import React, { Component } from "react";
import { convertToHTML } from "nib-converter";

import uploadCallback from "../../common/uploadCallback";

class ConvertToHTMLDemo extends Component {
  state = {
    content: {}
  };

  onChange = content => {
    this.setState({ content });
  };

  render() {
    const { content } = this.state;
    return (
      <div>
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
        {convertToHTML(content)}
      </div>
    );
  }
}

export default ConvertToHTMLDemo;
```
