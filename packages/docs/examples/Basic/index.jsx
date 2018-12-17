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

export default Basic;
