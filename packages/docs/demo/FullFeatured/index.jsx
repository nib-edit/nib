import React, { PureComponent } from "react";
import Editor from "nib-core";

/**
 * @visibleName 3. All
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
