export default class TrackChange {
  commits = [];

  addToCommits = (view, message) => {
    const { dispatch, state } = view;
    dispatch(state.tr.setMeta("track", message));
  };
}
