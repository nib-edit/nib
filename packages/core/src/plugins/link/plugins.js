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

export default new Plugin({
  key: linkPluginKey,

  state: {
    init: (_, state) => {
      return { link: getLink(state), decoration: undefined };
    },
    apply(tr, value, _, newState) {
      const { link: oldLink = {} } = value;
      const link = getLink(newState);

      const showEditLinkToolbar = tr.getMeta("SHOW_EDIT_LINK_TOOLBAR");
      if (showEditLinkToolbar === false) {
        return { link, decoration: undefined };
      }
      if (link) {
        if (
          !value.decoration ||
          oldLink.from !== link.from ||
          oldLink.to !== link.to
        ) {
          const decoration = DecorationSet.create(newState.doc, [
            Decoration.inline(link.from, link.to, {
              class: "nib-edit-link-marker"
            })
          ]);
          return { link, decoration };
        }
        return value;
      }

      const showLinkToolbar = tr.getMeta("SHOW_LINK_TOOLBAR");
      if (showLinkToolbar === true) {
        const { $from, $to } = newState.selection;
        let decor;
        if ($from.pos === $to.pos) {
          const node = document.createElement("span");
          node.className = "nib-link-marker";
          node.style.display = "inline-block";
          decor = Decoration.widget($from.pos, node);
        } else {
          decor = Decoration.inline($from.pos, $to.pos, {
            class: "nib-link-marker"
          });
        }
        const decoration = DecorationSet.create(newState.doc, [decor]);
        return { link, decoration };
      }

      if (showLinkToolbar === false) {
        return { link, decoration: undefined };
      }

      return value;
    }
  },

  props: {
    decorations(state) {
      const linkPluginState = state && linkPluginKey.getState(state);
      return linkPluginState.decoration;
    }
  }
});
