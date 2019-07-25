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
    apply(tr, prev, _, newState) {
      const link = getLink(newState);

      if (tr.getMeta("HIDE_LINK_TOOLBAR")) {
        return {
          ...prev,
          link,
          showAddLinkToolbar: false,
          createDecoration: undefined
        };
      }

      if (tr.getMeta("HIDE_EDIT_LINK_TOOLBAR")) {
        return {
          ...prev,
          link,
          showEditLinkToolbar: false,
          editDecoration: undefined
        };
      }

      let { createDecoration, editDecoration } = prev;
      if (tr.getMeta("SHOW_LINK_TOOLBAR")) {
        const { $from, $to } = newState.selection;
        if ($from.pos === $to.pos) {
          const node = document.createElement("span");
          node.className = "nib-link-marker";
          createDecoration = DecorationSet.create(newState.doc, [
            Decoration.widget($from.pos, node)
          ]);
        } else {
          createDecoration = DecorationSet.create(newState.doc, [
            Decoration.inline($from.pos, $to.pos, {
              class: "nib-link-marker"
            })
          ]);
        }
        return {
          link,
          createDecoration,
          showAddLinkToolbar: true
        };
      }

      const { showEditLinkToolbar } = prev;
      if (
        link &&
        (tr.getMeta("SHOW_EDIT_LINK_TOOLBAR") ||
          showEditLinkToolbar ||
          tr.getMeta("EDITOR_FOCUSED"))
      ) {
        if (
          !editDecoration ||
          (prev.link &&
            (prev.link.from !== link.from || prev.link.to !== link.to))
        ) {
          editDecoration = DecorationSet.create(newState.doc, [
            Decoration.inline(link.from, link.to, {
              class: "nib-edit-link-marker"
            })
          ]);
        }
        return { link, editDecoration, showEditLinkToolbar: true };
      }
      if (!link)
        return {
          ...prev,
          link,
          editDecoration: undefined,
          showEditLinkToolbar: tr.getMeta("SHOW_EDIT_LINK_TOOLBAR")
        };

      return {
        ...prev
      };
    }
  },

  props: {
    decorations(state) {
      const linkPluginState = state && linkPluginKey.getState(state);
      return linkPluginState.createDecoration || linkPluginState.editDecoration;
    },
    handleDOMEvents: {
      onBlur(view) {
        const { state, dispatch } = view;
        dispatch(state.tr.setMeta("HIDE_EDIT_LINK_TOOLBAR", true));
      },
      onFocus(view) {
        const { state, dispatch } = view;
        dispatch(state.tr.setMeta("HOW_EDIT_LINK_TOOLBAR", true));
      }
    },
    handleClickOn(view) {
      const { state, dispatch } = view;
      dispatch(state.tr.setMeta("SHOW_EDIT_LINK_TOOLBAR", true));
    },
    handleKeyDown(view) {
      const { state, dispatch } = view;
      dispatch(state.tr.setMeta("SHOW_EDIT_LINK_TOOLBAR", true));
    }
  }
});
