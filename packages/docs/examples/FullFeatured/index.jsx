import React, { PureComponent } from "react";
import Editor from "nib-core";

/**
 * @visibleName 7. All
 */
class FullFeatured extends PureComponent {
  render() {
    return (
      <Editor
        config={{
          toolbar: {
            options: "top"
          }
        }}
      />
    );
  }
}

export default FullFeatured;
