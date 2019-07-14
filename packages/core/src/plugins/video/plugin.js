import { Plugin, PluginKey } from "prosemirror-state";
import VideoView from "./nodeView";

export const videoPluginKey = new PluginKey("video");

export default new Plugin({
  key: videoPluginKey,

  state: {
    init: () => {
      return { videoOverlayVisible: false };
    },
    apply(tr, value) {
      if (tr.getMeta("SHOW_VIDEO_OVERLAY"))
        return { videoOverlayVisible: true };
      if (tr.getMeta("HIDE_VIDEO_OVERLAY"))
        return { videoOverlayVisible: false };
      return value;
    }
  },

  props: {
    nodeViews: {
      embed(node, view) {
        return new VideoView(node, view);
      }
    }
  }
});
