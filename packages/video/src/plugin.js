import { Plugin, PluginKey } from "prosemirror-state";
import VideoView from "./nodeView";

export const videoPluginKey = new PluginKey("video");

export default new Plugin({
  key: videoPluginKey,

  state: {
    init: () => {
      return {};
    },
    apply(tr, prev, _, newState) {
      const { schema, selection } = newState;
      const { $from, $to } = selection;
      const { embed } = schema.nodes;
      let isVideoPresent = false;
      newState.doc.nodesBetween($from.pos, $to.pos, (node) => {
        if (node.type === embed) isVideoPresent = true;
      });

      return { ...prev, isVideoPresent };
    },
  },
  props: {
    nodeViews: {
      embed(node, view) {
        return new VideoView(node, view);
      },
    },
  },
});
