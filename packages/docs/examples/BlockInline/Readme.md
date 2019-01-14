Editor with block formatting and inline formatting options available.

```js
<BlockInline />
```

Code:

```js static
import React, { Component } from "react";
import Editor from "nib-core";

class BlockInline extends Component {
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
            plugins: { options: "block inline history" },
            toolbar: {
              options: "top",
              top: {
                options: "block inline",
                block: { options: "p h1 h2 h3 h4 h5 h6", grouped: true }
              }
            }
          }}
          onChange={this.onChange}
        />
        <pre>{JSON.stringify(content, null, 4)}</pre>
      </div>
    );
  }
}

export default BlockInline;
```
