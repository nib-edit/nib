/**
 * TODO:review
 * improve code in all components
 */

import React, { PureComponent } from "react";
import Editor from "nib-core";

import uploadCallback from "../common/uploadCallback";
import data from "./data";

const theme = {
  editor: () => ({
    height: "440px"
  })
};

class TopBar extends PureComponent {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "32px 0"
        }}
      >
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
            defaultValue={data}
            styleConfig={theme}
          />
        </div>
      </div>
    );
  }
}

export default TopBar;

/**
 * todo:
 * 1. props link to open in new window.
 * 2. add point mobile frendliness
 */
