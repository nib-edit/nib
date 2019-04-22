import Editor from "nib-core";
import React, {Component} from "react";
import {convertToHTML} from "nib-converter";

import uploadCallback from "../../common/uploadCallback";

/**
 * @visibleName 4. Convert to HTML
 */
class ConvertToHTMLDemo extends Component {
  state = {
    content: {}
  };

  onChange = content => {
    this.setState({content});
  };

  render() {
    const {content} = this.state;
    return (
      <div>
        <Editor
          config={{
            plugins: {
              image: {
                uploadCallback
              }
            },
            toolbar: {
              options: "top"
            }
          }}
          onChange={this.onChange}
        />
        <div style={{marginTop: 20}}>HTML String Content:</div>
        <pre style={{whiteSpace: "inherit"}}>{convertToHTML(content)}</pre>
      </div>
    );
  }
}

export default ConvertToHTMLDemo;
