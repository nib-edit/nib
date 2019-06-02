import React, {useState} from "react";
import Editor from "nib-core";

/**
 * @visibleName 1. Basic
 */
const Basic = () => {
  const [content, setContent] = useState({});
  return (
    <div>
      <Editor
        config={{
          plugins: {options: ""},
          toolbar: {options: ""}
        }}
        onChange={setContent}
      />
      <pre>{JSON.stringify(content, null, 4)}</pre>
    </div>
  );
};

export default Basic;
