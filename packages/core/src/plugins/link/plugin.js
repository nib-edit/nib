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
      return { link: getLink(state) };
    },
    apply(tr, value, _, newState) {
      const link = getLink(newState);

      if (
        tr.getMeta("HIDE_EDIT_LINK_TOOLBAR") ||
        tr.getMeta("HIDE_LINK_TOOLBAR")
      ) {
        return { link };
      }

      let { decoration } = value;
      if (tr.getMeta("SHOW_LINK_TOOLBAR")) {
        const { $from, $to } = newState.selection;
        if ($from.pos === $to.pos) {
          const node = document.createElement("span");
          node.className = "nib-link-marker";
          decoration = DecorationSet.create(newState.doc, [
            Decoration.widget($from.pos, node)
          ]);
        } else {
          decoration = DecorationSet.create(newState.doc, [
            Decoration.inline($from.pos, $to.pos, {
              class: "nib-link-marker"
            })
          ]);
        }
        return { link, decoration };
      }

      if (link) {
        if (
          !decoration ||
          (value.link &&
            (value.link.from !== link.from || value.link.to !== link.to))
        ) {
          decoration = DecorationSet.create(newState.doc, [
            Decoration.inline(link.from, link.to, {
              class: "nib-edit-link-marker"
            })
          ]);
        }
        return { link, decoration };
      }

      return { decoration };
    }
  },

  props: {
    decorations(state) {
      const linkPluginState = state && linkPluginKey.getState(state);
      return linkPluginState.decoration;
    }
  }
});
