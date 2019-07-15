import React, { useState } from "react";
import Editor from "nib-core";

import uploadCallback from "../../common/uploadCallback";
import defaultValue from "./sampleData";

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
  button: {
    toolbar: {
      backgroundColor: "#212121",
      margin: "0 2px",
      "&:hover": `{
        color: #212121;
        background-color: #bdbdbd;
      }`,
      "&:selected": `{
        color: #212121;
        background-color: #757575;
      }`
    }
  },
  modal: {
    backgroundColor: "#212121",
    color: "#ffffff"
  },
  overlay: {
    backgroundColor: "#212121",
    color: "#ffffff"
  },
  icon: { fill: "#ffffff" },
  blockSelect: {
    backgroundColor: "#212121",
    color: "#ffffff",
    "&:hover": { backgroundColor: "#bdbdbd", color: "#ffffff" },
    "&:selected": { backgroundColor: "#757575" }
  },
  table: {
    cell: {
      menuWrapper: {
        backgroundColor: "#212121",
        color: "#ffffff"
      }
    }
  }
};

/**
 * @visibleName 6. Themed
 */
const Themed = () => {
  const [content, setContent] = useState();
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
        onChange={setContent}
        theme={customTheme}
        defaultValue={defaultValue}
      />
      <pre>{JSON.stringify(content || defaultValue, null, 4)}</pre>
    </div>
  );
};

export default Themed;
