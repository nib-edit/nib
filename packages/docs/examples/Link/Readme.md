Editor with list option enabled.

```js
<Link />
```

Code:

```js static
import React, { Component } from "react";
import Editor from "nib-core";

class Link extends Component {
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
          plugins="block inline link"
          toolbar={{ htop: { options: "block inline link" } }}
          onChange={this.onChange}
        />
        <pre>{JSON.stringify(content, null, 4)}</pre>
      </div>
    );
  }
}
```
