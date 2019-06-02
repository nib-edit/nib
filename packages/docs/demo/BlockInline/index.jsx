import React, {useState} from "react";
import Editor from "nib-core";

/**
 * @visibleName 2. Block inline
 */
const BlockInline = () => {
  const [content, setContent] = useState({});
  return (
    <div>
      <Editor
        config={{
          plugins: {options: "block inline list"},
          toolbar: {options: "top", top: {options: "block inline list"}}
        }}
        onChange={setContent}
      />
      <pre>{JSON.stringify(content, null, 4)}</pre>
    </div>
  );
};

export default BlockInline;
