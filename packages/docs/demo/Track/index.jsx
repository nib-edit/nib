import React, { useState, useEffect } from "react";

import Editor from "nib-core";
import NibTrack from "nib-track";

import defaultValue from "./sampleData";
import commits from "./savedCommits";

import "./styles.css";

const tracker = new NibTrack.EditorPlugin(commits);

/**
 * @visibleName 9. Track Changes
 */
const Track = () => {
  const [trackState, setTrackState] = useState(tracker.getState());
  const [message, setMessage] = useState("Sample message");
  const [name, setName] = useState("Anonymous user");

  const updateTrackedState = () => {
    setTrackState(tracker.getState());
  };
  const doCommit = () => {
    tracker.doCommit({ username: name, message });
    updateTrackedState();
  };
  const revertCommit = commit => {
    tracker.revertCommit(commit, { username: name, message });
    updateTrackedState();
  };
  const highlightCommit = commit => {
    tracker.highlightCommit(commit);
    updateTrackedState();
  };
  const resetHighlight = () => {
    tracker.resetHighlight();
    updateTrackedState();
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
      <Editor
        config={{
          plugins: { options: "block inline list" },
          toolbar: { options: "top", top: { options: "block inline list" } }
        }}
        addons={[tracker]}
        defaultValue={defaultValue}
        onChange={updateTrackedState}
      />
      <div className="nib-track_save_wraper">
        <input
          className="nib-track_msg"
          onChange={evt => setMessage(evt.target.value)}
          placeholder="Enter save message"
          value={message}
        />
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
          <th>Message</th>
          <th>Time</th>
          <th>Revert</th>
        </tr>
        {trackState.commits.map(commit => (
          <tr
            className={
              trackState.highlightedCommit &&
              trackState.highlightedCommit === commit
                ? "nib-highlighted_commit"
                : ""
            }
            onMouseEnter={() => highlightCommit(commit)}
            onMouseLeave={resetHighlight}
            key={`${commit.time}`}
          >
            <td>{commit.id}</td>
            <td>{commit.data.username}</td>
            <td>{commit.data.message}</td>
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

export default Track;
