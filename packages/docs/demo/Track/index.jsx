import React, { useState } from "react";
import Editor from "nib-core";
import NibTrack from "nib-track";

import defaultValue from "./sampleData";

import "./styles.css";

/**
 * @visibleName 8. Track Changes
 */
const Track = () => {
  const [trackState, setTrackState] = useState(NibTrack.getTrackedState());
  const [message, setMessage] = useState("");
  const updateCommits = () => {
    NibTrack.doCommit(message);
    setTrackState(NibTrack.getTrackedState());
    setMessage("");
  };
  const revertCommit = commit => {
    NibTrack.revertCommit(commit);
    setTrackState(NibTrack.getTrackedState());
  };
  const updateTrackedState = () => {
    setTrackState(NibTrack.getTrackedState());
  };
  return (
    <div>
      <Editor
        config={{
          plugins: { options: "" },
          toolbar: { options: "" }
        }}
        defaultValue={defaultValue}
        addons={[NibTrack]}
        onChange={updateTrackedState}
      />
      <div className="nib-track_save_wraper">
        <input
          placeholder="Enter save message"
          className="nib-track_msg"
          value={message}
          onChange={evt => setMessage(evt.target.value)}
        />
        <button
          disabled={!trackState.hasUncommittedSteps}
          className="nib-track_save"
          type="button"
          onClick={updateCommits}
        >
          Save
        </button>
      </div>
      <div className="nib-track_commits">Changes</div>
      <ol className="nib-track_commit_list">
        {trackState.commits.map(commit => (
          <li key={`${commit.time}`}>
            <span className="nib-track_commits_message">{commit.message}</span>
            <button
              className="nib-track_revert_btn"
              type="button"
              onClick={() => revertCommit(commit)}
            >
              Revert
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Track;
