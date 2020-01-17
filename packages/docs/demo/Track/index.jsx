import React, { useState, useEffect } from 'react';

import Editor from 'nib-core';
import TrackPlugin from 'nib-track';

import defaultValue from './sampleData';

import './styles.css';

const tracker = new TrackPlugin();

const userid = Math.floor(Math.random() * 0xffffffff);

const formatDate = str => {
  const d = new Date(str);
  if (!d) return '';
  return `${d.getMonth() +
    1}-${d.getDate()}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
};

/**
 * @visibleName 18. Track Changes
 */
const Track = () => {
  const [trackState, setTrackState] = useState(tracker.getState());
  const [name, setName] = useState('Anonymous user');
  const [cmd, setCmd] = useState(false);

  const updateTrackedState = () => setTrackState(tracker.getState());

  const doCommit = () => {
    tracker.doCommit({ username: name, userid });
    updateTrackedState();
  };

  const revertCommit = commit => {
    tracker.revertCommit(commit.id, { username: name, userid });
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
              addons={[tracker]}
              defaultValue={defaultValue}
              onChange={updateTrackedState}
            />
          </div>
          <div className="nib-track_save_wraper">
            <button
              className="nib-track_save"
              disabled={trackState && !trackState.hasUncommittedSteps}
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
              {trackState &&
                trackState.commits.map((commit, index) => (
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

export default Track;
