import React, { Component } from "react";
import Editor from "nib-core";

/**
 * @visibleName 3. Link
 */
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
            plugins: { options: "block inline link" },
            toolbar: {
              options: "top",
              top: {
                options: "block inline link"
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

// todo: command for link to be added
