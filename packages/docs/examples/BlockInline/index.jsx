import React, { Component } from "react";
import Editor from "@edit/core";

class BlockInline extends Component {
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

export default BlockInline;
