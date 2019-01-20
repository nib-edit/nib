Basic editor with only text editing enabled.

```js
<Basic />
```

Code:

```js static
import React, { Component } from "react";
import Editor from "nib-core";

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
        <Editor
          onChange={this.onChange}
          config={{
            plugins: { options: "" },
            toolbar: { options: "" }
          }}
        />
        <pre>{JSON.stringify(content, null, 4)}</pre>
      </div>
    );
  }
}

export default Basic;
```
