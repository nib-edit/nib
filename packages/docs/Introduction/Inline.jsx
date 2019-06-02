import React, {PureComponent} from "react";
import Editor from "nib-core";

import uploadCallback from "../common/uploadCallback";

const defaultValue = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "em"
            }
          ],
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
      ]
    }
  ]
};

class Inline extends PureComponent {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div style={{width: "75%"}}>
          <Editor
            config={{
              plugins: {options: "block inline link"},
              toolbar: {
                options: "inline",
                inline: {
                  options: "block inline link",
                  block: {options: "p h1 h2", grouped: false}
                }
              }
            }}
            defaultValue={defaultValue}
            theme={{
              wrapper: {
                borderTop: "none",
                borderBottom: "none",
                borderLeft: "none",
                borderRight: "none"
              }
            }}
          />
        </div>
      </div>
    );
  }
}

export default Inline;
