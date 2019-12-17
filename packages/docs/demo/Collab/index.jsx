import React, { useState, useEffect } from "react";
import Editor from "nib-core";
import ReactSelect from "react-select";

import CollabPlugin from "nib-collab-client";

import "./styles.css";

const user = {
  id: Math.floor(Math.random() * 0xffffffff),
  name: "Anonymous user"
};
const collab = new CollabPlugin({
  // serviceURL: "ws://localhost:3000",
  serviceURL: "ws://nib-collab.herokuapp.com",
  user
});

/**
 * @visibleName 19. Collaborative Editing
 */
const Collab = () => {
  const [editorState, setEditorState] = useState();
  const [username, setUsername] = useState("Anonymous user");
  const [users, setUsers] = useState();

  useEffect(() => {
    collab.startSyncing(setUsers);
    return () => {
      collab.stopSyncing();
    };
  }, []);

  const options = users
    ? Object.values(users).map(({ id, name }) => ({ value: id, label: name }))
    : [];

  return (
    <div>
      <div style={{ width: 200, marginBottom: 20 }}>
        <div>
          <span style={{ fontSize: 14, width: 100, display: "inline-block" }}>
            User Name
          </span>
          <input
            style={{ marginBottom: 10 }}
            className="nib-comment_msg"
            onChange={evt => setUsername(evt.target.value)}
            placeholder="Enter user name"
            value={username}
          />
        </div>
        <button
          style={{ marginBottom: 20 }}
          className="docs_btn"
          type="button"
          onClick={() => {
            collab.updateUserData({ name: username });
          }}
        >
          Update
        </button>
        <div className="select-wrapper">
          <span style={{ fontSize: 14, display: "inline-block" }}>
            Connected Users
          </span>
          <ReactSelect
            value={options.find(({ value }) => value === user.id)}
            options={options}
          />
        </div>
      </div>
      <div style={{ position: "relative" }}>
        {!users && (
          <div className="nib_message">Connecting to the server...</div>
        )}
        <Editor
          addons={[collab]}
          defaultValue={editorState}
          onChange={setEditorState}
        />
      </div>
    </div>
  );
};

export default Collab;
