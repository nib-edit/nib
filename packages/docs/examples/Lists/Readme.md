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
          config={{
            plugins: { options: "block inline list" },
            toolbar: {
              options: "top inline",
              top: {
                options: "block inline list"
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

export default List;
```
