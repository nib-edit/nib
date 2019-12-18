import React, { useState, useEffect } from 'react';

import Editor from 'nib-core';
import TrackPlugin from 'nib-track';
import CommentPlugin from 'nib-comment';

import defaultValue from './sampleData';
import commits from './savedCommits';
import comments from './savedComments';

const user = {
  userid: '12345',
  username: 'Anonymous user',
};
const tracker = new TrackPlugin(commits);
const commenter = new CommentPlugin(comments, user, '#f8bbd0');

const formatDate = str => {
  const d = new Date(str);
  if (!d) return '';
  return `${d.getMonth() +
    1}-${d.getDate()}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
};

/**
 * @visibleName 17. Track + Comment
 */
const TrackWithComment = () => {
  const [trackState, setTrackState] = useState(tracker.getState());
  const [userid, setUserid] = useState(user.userid);
  const [username, setUsername] = useState(user.username);
  const [message, showMessage] = useState(false);
  const [cmd, setCmd] = useState(user.username);

  const updateTrackedState = () => {
    setTrackState(tracker.getState());
  };
  const doCommit = () => {
    tracker.doCommit(user);
    updateTrackedState();
  };
  const revertCommit = commit => {
    tracker.revertCommit(commit.id, user);
    updateTrackedState();
  };
  const highlightCommit = commit => {
    tracker.highlightCommit(commit.id);
    updateTrackedState();
  };
  const resetHighlight = () => {
    tracker.resetHighlight();
    updateTrackedState();
  };
  const onKeyDown = evt => {
    if (evt.key === 'Meta') setCmd(true);
    else if (evt.key === 's' && cmd) {
      doCommit();
      evt.preventDefault();
    }
  };
  const onKeyUp = () => {
    setCmd(false);
  };

  useEffect(() => updateTrackedState(), []);

  return (
    <div>
      <div>
        <span style={{ fontSize: 14, width: 100, display: 'inline-block' }}>
          User Id
        </span>
        <input
          style={{ marginBottom: 10 }}
          className="nib-comment_msg"
          onChange={evt => setUserid(evt.target.value)}
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
      <div className="nib-track-wrapper">
        <div>
          <div onKeyDown={onKeyDown} onKeyUp={onKeyUp}>
            <Editor
              config={{
                plugins: { options: 'block inline list' },
                toolbar: {
                  options: 'top',
                  top: { options: 'block inline list' },
                },
              }}
              addons={[tracker, commenter]}
              defaultValue={defaultValue}
              onChange={updateTrackedState}
            />
          </div>
          <div className="nib-track_save_wraper">
            <button
              className="nib-track_save"
              disabled={!trackState.hasUncommittedSteps}
              onClick={doCommit}
              type="button"
            >
              Save
            </button>
          </div>
        </div>
        <div>
          <div className="nib-track_commits">Changes</div>
          <table className="nib-track_table">
            <tbody>
              {trackState.commits.map((commit, index) => (
                <tr key={`${commit.time}`}>
                  <td>
                    <div
                      className={
                        trackState.highlightedCommit &&
                        trackState.highlightedCommit === commit
                          ? 'nib-highlighted-commit'
                          : ''
                      }
                      onMouseEnter={() => highlightCommit(commit)}
                      onMouseLeave={resetHighlight}
                    >
                      <div>{`${index + 1}. ${commit.data.username}`}</div>
                      <div>{formatDate(commit.time)}</div>
                      <div>
                        <button
                          className="nib-track_revert_btn"
                          onClick={() => revertCommit(commit)}
                          type="button"
                        >
                          Revert
                        </button>
                      </div>
                    </div>
                    <div className="nib-track-space" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrackWithComment;
