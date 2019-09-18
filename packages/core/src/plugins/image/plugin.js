import { Plugin, PluginKey } from "prosemirror-state";
import ImageView from "./nodeView";

const imagePluginKey = new PluginKey("image");

const imagePlugin = new Plugin({
  key: imagePluginKey,

  props: {
    nodeViews: {
      image(node, view, getPos) {
        return new ImageView(node, view, getPos);
      }
    }
  }
});

export default imagePlugin;
export { imagePluginKey };
