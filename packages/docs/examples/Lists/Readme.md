Editor with list option enabled.

```js
<List />
```

Code:

```js static
import React, { Component } from "react";
import Editor from "nib-core";

class List extends Component {
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
          plugins="block inline list"
          toolbar={{ htop: "block inline list" }}
          onChange={this.onChange}
        />
        <pre>{JSON.stringify(content, null, 4)}</pre>
      </div>
    );
  }
}
```
