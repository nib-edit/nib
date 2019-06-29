import React from "react";
import Editor from "nib-core";

import uploadCallback from "../../common/uploadCallback";

const customTheme = {
  wrapper: {
    backgroundColor: "#212121",
    borderBottom: "none",
    borderLeft: "none",
    borderRight: "none",
    borderTop: "none",
    padding: "2px"
  },
  editor: {
    backgroundColor: "#212121",
    color: "#ffffff",
    borderBottom: "none",
    borderLeft: "none",
    borderRight: "none",
    borderTop: "none"
  },
  toolbar: {
    top: {
      backgroundColor: "#212121",
      borderBottom: "1px solid #ffffff",
      borderLeft: "none",
      borderRight: "none",
      borderTop: "none",
      padding: "4px 4px 6px 4px"
    }
  },
  toolbarSeparator: {
    backgroundColor: "#ffffff"
  },
  blockSelect: {
    "&:hover": {backgroundColor: "#EEEEEE"},
    "&:selected": {
      backgroundColor: "#bdbdbd"
    }
  },
  button: {
    toolbar: {
      margin: "0 2px",
      "&:hover": `{
        background-color: #EEEEEE;
      }`,
      "&:selected": `{
        background-color: #bdbdbd;
      }`
    }
  }
};

/**
 * @visibleName 6. Themed
 */
const Themed = () => (
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
    theme={customTheme}
  />
);

export default Themed;
