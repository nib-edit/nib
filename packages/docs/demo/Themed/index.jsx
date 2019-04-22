import React from "react";
import Editor from "nib-core";

import uploadCallback from "../../common/uploadCallback";

const customTheme = {
  wrapper: {
    backgroundColor: "#BDBDBD",
    padding: "2px"
  },
  editor: {
    backgroundColor: "#BDBDBD",
    borderBottom: "none",
    borderLeft: "none",
    borderRight: "none",
    borderTop: "none"
  },
  toolbar: {
    top: {
      backgroundColor: "#BDBDBD",
      borderBottom: "1px solid #757575",
      borderLeft: "none",
      borderRight: "none",
      borderTop: "none",
      padding: "4px 4px 6px 4px"
    }
  },
  toolbarSeparator: {
    backgroundColor: "#757575"
  },
  blockSelect: {
    "&:hover": {backgroundColor: "#EEEEEE"},
    "&:selected": {backgroundColor: "#E0E0E0"}
  },
  button: {
    toolbar: {
      "&:hover": `{
        background-color: #EEEEEE;
      }`,
      "&:selected": `{
        background-color: #E0E0E0;
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
