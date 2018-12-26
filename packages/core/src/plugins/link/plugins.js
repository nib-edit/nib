import { Plugin, PluginKey } from "prosemirror-state";
import { DecorationSet, Decoration } from "prosemirror-view";

export const linkPluginKey = new PluginKey("link");

const isLinkPresent = editorState => {
  const {
    selection: { $from, $to },
    schema: { marks }
  } = editorState;
  let linkPresent = false;
  editorState.doc.nodesBetween($from.pos - 1, $to.pos, node => {
    if (node.marks && node.marks.some(mark => mark.type === marks.link)) {
      linkPresent = true;
    }
  });
  return linkPresent;
};

const linkPlugin = new Plugin({
  key: linkPluginKey,
  view: undefined,

  state: {
    init: (_, state) => {
      return { linkMarkActive: isLinkPresent(state) };
    },
    apply(tr, value, _, newState) {
      let { linkMarkActive, showLinkToolbar } = value;
      linkMarkActive = isLinkPresent(newState);
      if (tr.getMeta(linkPluginKey) === "SHOW_LINK_TOOLBAR") {
        showLinkToolbar = true;
      }
      if (tr.getMeta(linkPluginKey) === "HIDE_LINK_TOOLBAR") {
        showLinkToolbar = false;
      }
      return { linkMarkActive, showLinkToolbar };
    }
  },

  props: {
    decorations(state) {
      const linkPluginState = state && linkPluginKey.getState(state);
      if (!linkPluginState.showLinkToolbar) return;
      const { $from } = state.selection;
      const node = document.createElement("span");
      node.className = "nib-link-marker";
      return DecorationSet.create(state.doc, [
        Decoration.widget($from.pos, node)
      ]);
    }
  }
});

export default [linkPlugin];
