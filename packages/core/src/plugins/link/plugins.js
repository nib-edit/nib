import { Plugin, PluginKey } from "prosemirror-state";
import { DecorationSet, Decoration } from "prosemirror-view";

export const linkPluginKey = new PluginKey("link");

const getLink = state => {
  const {
    selection: { $from, $to },
    schema: { marks },
    doc
  } = state;
  let link;
  doc.nodesBetween($from.pos, $to.pos, (node, from) => {
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
      return { link: getLink(state), decoration: undefined };
    },
    apply(tr, value, _, newState) {
      let { link, decoration } = value;
      link = getLink(newState);
      const showLinkToolbar = tr.getMeta("SHOW_LINK_TOOLBAR");
      if (!link && showLinkToolbar === true) {
        const { $from } = newState.selection;
        const node = document.createElement("span");
        node.className = "nib-link-marker";
        decoration = DecorationSet.create(newState.doc, [
          Decoration.widget($from.pos, node)
        ]);
      } else if (showLinkToolbar === false) {
        decoration = undefined;
      }
      return { link, decoration };
    }
  },

  props: {
    decorations(state) {
      const linkPluginState = state && linkPluginKey.getState(state);
      return linkPluginState.decoration;
    }
  }
});

export default linkPlugin;
