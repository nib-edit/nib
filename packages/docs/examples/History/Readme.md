Editor with block formatting and inline formatting options available.

```js
<History />
```

Code:

```js static
import React, { Component } from "react";
import Editor from "nib-core";

class History extends Component {
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
                options: "block inline history",
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

export default History;
```
