import { Plugin, PluginKey } from "prosemirror-state";
import TrackState from "./trackState";

export const trackPluginKey = new PluginKey("track");

export default new Plugin({
  key: trackPluginKey,
  state: {
    init: () => {
      return new TrackState([], [], [], []);
    },
    apply: (tr, tracked) => {
      let newTracked = tracked;
      if (tr.docChanged) newTracked = newTracked.applyTransform(tr);
      const message = tr.getMeta("track");
      if (message)
        newTracked = newTracked.applyCommit(message, new Date(tr.time));
      return newTracked;
    }
  }
});
