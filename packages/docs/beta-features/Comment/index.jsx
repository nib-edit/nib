import React, { useState } from 'react';

import Editor from 'nib-core';
import CommentPlugin from 'nib-comment';

import defaultValue from './sampleData';

import './styles.css';

// const customTheme = {
//   color: {
//     highlight: { secondary: "#424242" },
//     backgroundHighlight: { primary: "#e0e0e0", secondary: "#e0e0e0bf" },
//     textHighlight: { primary: "#212121" },
//     text: { primary: "#e0e0e0", secondary: "#bdbdbd" },
//     background: {
//       primary: "#212121",
//       secondary: "#424242"
//     },
//     border: {
//       primary: "#636363"
//     },
//     blurMarker: "#616161"
//   },
//   border: {
//     primary: "1px solid #636363"
//   },
//   boxShadow: {
//     secondary: "#424242 0px 1px 0px"
//   }
// };

const commenter = new CommentPlugin({
  userid: '12345',
  username: 'Anonymous user',
});

/**
 * @visibleName 1. Comment
 */
const Comment = () => {
  const [userid, setUserid] = useState('12345');
  const [username, setUsername] = useState('Anonymous user');
  const [message, showMessage] = useState(false);

  return (
    <div>
      <div>
        <span style={{ fontSize: 14, width: 100, display: 'inline-block' }}>
          User Id
        </span>
        <input
          style={{ marginBottom: 10 }}
          className="nib-comment_msg"
          onChange={(evt) => setUserid(evt.target.value)}
          placeholder="Enter id"
          value={userid}
        />
      </div>
      <div>
        <span style={{ fontSize: 14, width: 100, display: 'inline-block' }}>
          User Name
        </span>
        <input
          style={{ marginBottom: 10 }}
          className="nib-comment_msg"
          onChange={(evt) => setUsername(evt.target.value)}
          placeholder="Enter user name"
          value={username}
        />
      </div>
      <button
        style={{ marginBottom: 20 }}
        className="docs_btn"
        type="button"
        onClick={() => {
          commenter.updateData({ userid, username });
          showMessage(true);
        }}
      >
        Update
      </button>
      {message && (
        <span style={{ fontSize: 14, marginLeft: 10 }}>
          User details updated.
        </span>
      )}
      <Editor
        config={{
          plugins: { options: 'block inline list' },
          toolbar: { options: 'top', top: { options: 'block inline list' } },
        }}
        addons={[commenter]}
        // theme={customTheme}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default Comment;
