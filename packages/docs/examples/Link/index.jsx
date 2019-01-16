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
          config={{
            plugins: { options: "block inline link history" },
            toolbar: {
              options: "top inline",
              top: {
                options: "block inline link",
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

export default Link;
