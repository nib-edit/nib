import { Plugin, PluginKey } from "prosemirror-state";
import VideoView from "./nodeView";

const videoPluginKey = new PluginKey("video");

const videoPlugin = new Plugin({
  key: videoPluginKey,

  props: {
    nodeViews: {
      embed(node, view) {
        return new VideoView(node, view);
      }
    }
  }
});

export default videoPlugin;
export { videoPluginKey };
