import { Plugin, PluginKey } from "prosemirror-state";
import { DecorationSet, Decoration } from "prosemirror-view";

export const linkPluginKey = new PluginKey("link");

const getLink = editorState => {
  const {
    selection: { $from, $to },
    schema: { marks }
  } = editorState;
  let link;
  editorState.doc.nodesBetween($from.pos, $to.pos, (node, from) => {
    if (node.marks) {
      const linkMark = node.marks.find(mark => mark.type === marks.link);
      if (linkMark) {
        link = { from, to: from + node.nodeSize, href: linkMark.attrs.href };
      }
    }
  });
  return link;
};

const linkPlugin = new Plugin({
  key: linkPluginKey,

  state: {
    init: (_, state) => {
      return { link: getLink(state) };
    },
    apply(tr, value, _, newState) {
      let { link, showLinkToolbar } = value;
      link = getLink(newState);
      if (tr.getMeta(linkPluginKey) === "SHOW_LINK_TOOLBAR") {
        showLinkToolbar = true;
      }
      if (tr.getMeta(linkPluginKey) === "HIDE_LINK_TOOLBAR") {
        showLinkToolbar = false;
      }
      return { link, showLinkToolbar };
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
