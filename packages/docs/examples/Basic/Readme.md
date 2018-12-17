Very basic editor with just text editing option enabled.

```js
<Basic />
```

Code:

```js static
import React, { Component } from "react";
import Editor from "@edit/core";

class Basic extends Component {
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
        <Editor onChange={this.onChange} />
        <pre>{JSON.stringify(content, null, 4)}</pre>
      </div>
    );
  }
}
```
