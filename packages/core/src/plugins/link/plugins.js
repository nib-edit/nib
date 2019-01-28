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
      return { link: getLink(state), decoration: {} };
    },
    apply(tr, value, _, newState) {
      const { link: oldLink = {}, decoration: oldDecoration = {} } = value;
      const link = getLink(newState);

      const showEditLinkToolbar = tr.getMeta("SHOW_EDIT_LINK_TOOLBAR");
      if (showEditLinkToolbar === false) {
        return { link, decoration: {} };
      }
      if (link) {
        if (
          !value.decoration ||
          oldLink.from !== link.from ||
          oldLink.to !== link.to
        ) {
          const decoration = {
            edit_link: DecorationSet.create(newState.doc, [
              Decoration.inline(link.from, link.to, {
                class: "nib-edit-link-marker"
              })
            ])
          };
          return { link, decoration };
        }
        return { link, decoration: oldDecoration };
      } else {
        oldDecoration.edit_link = undefined;
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
        const decoration = {
          create_link: DecorationSet.create(newState.doc, [decor])
        };
        return { link, decoration };
      }

      if (showLinkToolbar === false) {
        return { link, decoration: {} };
      }

      return { link, decoration: oldDecoration };
    }
  },

  props: {
    decorations(state) {
      const linkPluginState = state && linkPluginKey.getState(state);
      return Object.values(linkPluginState.decoration)[0];
    }
  }
});
