import { Mapping } from "prosemirror-transform";

import { trackPluginKey, highlightPluginKey } from "../pmPlugins";

export const doCommit = (view, message) => {
  if (!view) return;
  const { dispatch, state } = view;
  dispatch(state.tr.setMeta("track", message));
};

export const highlightCommit = (view, commit) => {
  if (!view) return;
  const { dispatch, state } = view;
  dispatch(state.tr.setMeta("highlight", commit));
};

export const getTrackState = view => {
  if (!view)
    return {
      commits: [],
      hasUncommittedSteps: false,
      highlightedCommit: undefined
    };
  const { state } = view;
  const trackPluginState = trackPluginKey.getState(state);
  const { commits, uncommittedSteps } = trackPluginState;
  return {
    commits,
    hasUncommittedSteps: uncommittedSteps.length > 0,
    highlightedCommit: highlightPluginKey.getState(view.state).commit
  };
};

export const revertCommit = (view, commit) => {
  if (!view) return { state: "FAILED" };

  const { dispatch, state } = view;
  const trackPluginState = trackPluginKey.getState(state);
  const { commits, uncommittedSteps } = trackPluginState;
  const commitIndex = commits.indexOf(commit);
  if (commitIndex < 0) return { state: "FAILED", message: "INVALID_COMMIT" };
  if (uncommittedSteps.length > 0)
    return { state: "FAILED", message: "UNCOMMITTED_CHANGES" };

  const newCommits = commits.slice(commitIndex);
  const remap = new Mapping(
    newCommits.reduce((maps, c) => maps.concat(c.maps), [])
  );
  const { tr } = state;

  for (let i = commit.steps.length - 1; i >= 0; i -= 1) {
    const remapped = commit.steps[i].map(remap.slice(i + 1));
    if (remapped) {
      const result = tr.maybeStep(remapped);
      if (result.doc) remap.appendMap(remapped.getMap(), i);
    }
  }

  if (tr.docChanged) dispatch(tr.setMeta("track", `revert ${commit.message}`));

  return { state: "SUCCESS" };
};

export const getCommitAtSelection = view => {
  const { state } = view;
  const { selection } = state;
  if (!selection) return undefined;
  const trackPluginState = trackPluginKey.getState(state);
  const map = trackPluginState.blameMap;
  for (let i = 0; i < map.length; i++) {
    if (
      map[i].to >= selection.head &&
      map[i].from < selection.head &&
      map[i].commit !== undefined
    ) {
      return trackPluginState.commits[map[i].commit];
    }
  }
  return undefined;
};
