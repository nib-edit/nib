import trackPlugins from "./pmPlugins";
import {
  doCommit,
  getCommitAtSelection,
  getTrackState,
  highlightCommit,
  revertCommit
} from "./utils/trackState";

export default class Track {
  name = "track";

  view = undefined;

  highlightListener = [];

  pmPlugins = trackPlugins;

  viewListener = newView => {
    this.view = newView;
    this.highlightListener.forEach(listener => listener());
  };

  getView = () => this.view;

  addHighlightListener = listener => {
    this.highlightListener.push(listener);
  };

  removeHighlightListener = listener => {
    const index = this.highlightListener.indexOf(listener);
    this.highlightListener.splice(index, 0);
  };

  doCommit = message => doCommit(this.view, message);

  highlightCommit = commit => highlightCommit(this.view, commit);

  getState = () => getTrackState(this.view);

  revertCommit = commit => revertCommit(this.view, commit);

  getCommitAtSelection = () => getCommitAtSelection(this.view);
}
