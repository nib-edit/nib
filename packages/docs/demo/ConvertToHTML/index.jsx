import Editor from "nib-core";
import React, { Component } from "react";
import { convertToHTML } from "nib-converter";

/**
 * @visibleName 6. ConvertToHTML
 */
class ConvertToHTMLDemo extends Component {
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
            plugins: { options: "block inline list link" },
            toolbar: {
              options: "top",
              top: { options: "block inline list link" }
            }
          }}
          onChange={this.onChange}
        />
        <div style={{ marginTop: 20 }}>HTML String Content:</div>
        <pre style={{ whiteSpace: "inherit" }}>{convertToHTML(content)}</pre>
      </div>
    );
  }
}

export default ConvertToHTMLDemo;
