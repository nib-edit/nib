import React, {useState} from "react";
import Editor from "nib-core";
import Cross from "../../styleguide/cross.svg";

import uploadCallback from "../../common/uploadCallback";

const theme = {
  wrapper: {
    height: "100%",
    minHeight: "100%",
    width: "100%"
  },
  editor: {
    height: "100%",
    minHeight: "100%",
    width: "100%"
  }
};

const FullPageEditor = ({setContent}) => {
  return (
    <Editor
      config={{
        plugins: {
          image: {
            uploadCallback
          }
        }
      }}
      onChange={setContent}
      theme={theme}
    />
  );
};

/**
 * @visibleName 7. Full Page
 */
const FullPage = () => {
  const [fullPageEditorVisible, showFullPageEditor] = useState(false);
  const [content, setContent] = useState({});

  const showEditor = () => {
    document.body.style.overflow = "hidden";
    showFullPageEditor(true);
  };

  const hideEditor = () => {
    document.body.style.overflow = "scroll";
    showFullPageEditor(false);
  };

  return (
    <div>
      {fullPageEditorVisible && (
        <div className="editor_wrapper">
          <img src={Cross} className="close-icon" onClick={hideEditor} />
          <FullPageEditor setContent={setContent} />
        </div>
      )}
      <button className="docs_btn" onClick={showEditor}>
        Show Editor
      </button>

      <pre>{JSON.stringify(content, null, 4)}</pre>
    </div>
  );
};

export default FullPage;
