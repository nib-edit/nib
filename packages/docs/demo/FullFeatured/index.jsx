import React, { PureComponent } from "react";
import Editor from "nib-core";

import uploadCallback from "../../common/uploadCallback";

/**
 * @visibleName 3. All
 */
class FullFeatured extends PureComponent {
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
        <pre>{JSON.stringify(content, null, 4)}</pre>
      </div>
    );
  }
}

export default FullFeatured;
