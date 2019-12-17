import React, { useState, useEffect } from 'react';

import Editor from 'nib-core';
import TrackPlugin from 'nib-track';
import CommentPlugin from 'nib-comment';

import defaultValue from './sampleData';
import commits from './savedCommits';
import comments from './savedComments';

import './styles.css';

const user = {
  userid: '12345',
  username: 'Anonymous user',
};
const tracker = new TrackPlugin(commits);
const commenter = new CommentPlugin(comments, user);

/**
 * @visibleName 17. Track + Comment
 */
const TrackWithComment = () => {
  const [trackState, setTrackState] = useState(tracker.getState());
  const [name, setName] = useState('Anonymous user');
  const [cmd, setCmd] = useState('Anonymous user');

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
      <input
        style={{ marginBottom: 10 }}
        className="nib-track_msg"
        onChange={evt => setName(evt.target.value)}
        placeholder="Enter user name"
        value={name}
      />
      <div onKeyDown={onKeyDown} onKeyUp={onKeyUp}>
        <Editor
          config={{
            plugins: { options: 'block inline list' },
            toolbar: { options: 'top', top: { options: 'block inline list' } },
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
      <div className="nib-track_commits">Changes</div>
      <table className="nib-track_table">
        <tr>
          <th>Id</th>
          <th>User Name</th>
          <th>Time</th>
          <th>Revert</th>
        </tr>
        {trackState.commits.map(commit => (
          <tr
            className={
              trackState.highlightedCommit &&
              trackState.highlightedCommit === commit
                ? 'nib-highlighted-commit'
                : ''
            }
            onMouseEnter={() => highlightCommit(commit)}
            onMouseLeave={resetHighlight}
            key={`${commit.time}`}
          >
            <td>{commit.id + 1}</td>
            <td>{commit.data.username}</td>
            <td>{commit.time.toLocaleString()}</td>
            <td>
              <button
                className="nib-track_revert_btn"
                onClick={() => revertCommit(commit)}
                type="button"
              >
                Revert
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default TrackWithComment;
