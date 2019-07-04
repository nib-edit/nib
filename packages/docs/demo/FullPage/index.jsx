import React, {useState} from "react";
import Editor from "nib-core";
import Cross from "../../styleguide/cross.svg";

import uploadCallback from "../../common/uploadCallback";

const theme = {
  wrapper: {
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
  const [fullPageVisible, showFullPage] = useState(false);
  const [content, setContent] = useState({});

  return (
    <div>
      <button className="docs_btn" onClick={() => showFullPage(true)}>
        Show Editor
      </button>
      {fullPageVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 10
          }}
        >
          <img
            src={Cross}
            className="close-icon"
            onClick={() => showFullPage(false)}
          />
          <FullPageEditor setContent={setContent} />
        </div>
      )}
      <pre>{JSON.stringify(content, null, 4)}</pre>
    </div>
  );
};

export default FullPage;
