import React, { useState, useEffect } from "react";

import Editor from "nib-core";
import NibTrack from "nib-comment";

import defaultValue from "./sampleData";

import "./styles.css";

const tracker = new NibTrack.EditorPlugin();

/**
 * @visibleName 8. Track Changes
 */
const Track = () => {
  const [error, setError] = useState(false);
  const [trackState, setTrackState] = useState(tracker.getState());
  const [message, setMessage] = useState("");

  const addComment = () => {
    if (!message) {
      setError(true);
      return;
    }
    setError(false);
    tracker.addComment(message);
    setTrackState(tracker.getState());
    setMessage("");
  };
  const revertCommit = commit => {
    tracker.revertCommit(commit);
    setTrackState(tracker.getState());
  };
  const highlightCommit = commit => {
    tracker.highlightCommit(commit);
    setTrackState(tracker.getState());
  };
  const updateTrackedState = () => {
    setError(false);
    setTrackState(tracker.getState());
  };

  useEffect(() => {
    tracker.addHighlightListener(updateTrackedState);
    return () => {
      tracker.removeHighlightListener(updateTrackedState);
    };
  }, []);

  return (
    <div>
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
          className={error ? "nib-track_msg_err" : "nib-track_msg"}
          onChange={evt => setMessage(evt.target.value)}
          placeholder="Enter save message"
          value={message}
        />
        <button
          className="nib-track_save"
          disabled={!trackState.hasUncommittedSteps}
          onClick={addComment}
          type="button"
        >
          Save
        </button>
      </div>
      <div className="nib-track_commits">Changes</div>
      <ol className="nib-track_commit_list">
        {trackState.commits.map(commit => (
          <li
            className={
              trackState.highlightedCommit &&
              trackState.highlightedCommit === commit
                ? "nib-highlighted_commit"
                : ""
            }
            key={`${commit.time}`}
          >
            <span className="nib-track_commits_message">{commit.message}</span>
            <button
              className="nib-track_revert_btn"
              onClick={() => revertCommit(commit)}
              type="button"
            >
              Revert
            </button>
            <button
              className="nib-track_revert_btn"
              onClick={() => highlightCommit(commit)}
              type="button"
            >
              Highlight
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Track;
