Editor with link option enabled.

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
            plugins: { options: "block inline list history" },
            toolbar: {
              options: "top inline",
              top: {
                options: "block inline list",
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

export default List;
```
