Editor with block formatting and inline formatting options available.

```js
<BlockInline />
```

Code:

```js static
import React from "react";
import Editor from "@editr/core";

class EditorBlockInline extends Component {
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
          plugins="block inline"
          toolbar="basic"
          onChange={this.onChange}
        />
        <pre>{JSON.stringify(content, null, 4)}</pre>
      </div>
    );
  }
}
```
