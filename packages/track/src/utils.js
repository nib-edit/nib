import { Mapping } from "prosemirror-transform";
import ViewStore from "./ViewStore";
import { trackPluginKey } from "./trackPlugin";

export const doCommit = message => {
  const view = ViewStore.getView();
  if (view) {
    const { dispatch, state } = view;
    dispatch(state.tr.setMeta("track", message));
  }
};

export const getTrackedState = () => {
  const view = ViewStore.getView();
  if (!view) return { commits: [], hasUncommittedSteps: false };
  const { state } = view;
  const trackPluginState = trackPluginKey.getState(state);
  const { commits, uncommittedSteps } = trackPluginState;
  console.log(trackPluginState, uncommittedSteps);
  return { commits, hasUncommittedSteps: uncommittedSteps.length > 0 };
};

export const revertCommit = commit => {
  const view = ViewStore.getView();
  if (!view) return [];
  const { dispatch, state } = view;
  const trackPluginState = trackPluginKey.getState(state);
  const { commits, uncommittedSteps } = trackPluginState;
  const commitIndex = commits.indexOf(commit);
  if (commitIndex < 0) return undefined;
  if (uncommittedSteps.length > 0) return "Commit all changes first.";
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
  return undefined;
};
