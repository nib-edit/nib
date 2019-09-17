import React, { useState, useEffect } from "react";
import Editor from "nib-core";

import CollabPlugin from "nib-collab-client";

const collab = new CollabPlugin({
  serviceURL: "ws://nib-collab.herokuapp.com",
  clientID: Math.floor(Math.random() * 0xffffffff)
})

/**
 * @visibleName 11. Collaborative Editing
 */
const Collab = () => {
  const [editorState, setEditorState] = useState();

  useEffect(() => {
    return () => {
      collab.stopSyncing()
    }
  }, [])

  return (
    <div>
      <Editor
        addons={[collab]}
        defaultValue={editorState}
        onChange={setEditorState}
      />
    </div>
  );
};

export default Collab;
