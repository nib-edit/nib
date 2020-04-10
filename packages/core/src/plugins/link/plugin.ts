import { DecorationSet, Decoration } from 'prosemirror-view';
import { Plugin, PluginKey, EditorState } from 'prosemirror-state';
import { Mark, Node } from 'prosemirror-model';

export const linkPluginKey = new PluginKey('link');

interface LinkInfo {
  from: any;
  to: any;
  href: any;
  contained: any;
}

const getLink = (state: EditorState): LinkInfo | undefined => {
  const {
    selection: { $from, $to },
    schema: { marks },
    doc
  } = state;
  const fromLinkMark = $from
    .marks()
    .find((mark: Mark) => mark.type === marks.link);
  const toLinkMark = $to.marks().find((mark: Mark) => mark.type === marks.link);
  let link;
  doc.nodesBetween($from.pos, $to.pos, (node: Node, from: number) => {
    if (node.marks) {
      const linkMark = node.marks.find(
        (mark: Mark) => mark.type === marks.link
      );
      if (linkMark) {
        link = {
          from,
          to: from + node.nodeSize,
          href: linkMark.attrs.href,
          contained: !fromLinkMark || !toLinkMark || fromLinkMark === toLinkMark
        };
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

      const editorFocusState = tr.getMeta('editor-focused');
      if (editorFocusState !== undefined) {
        return {
          ...prev,
          editorFocusState
        };
      }

      if (tr.getMeta('hide-all-popups')) {
        return {
          link,
          editorFocusState: prev.editorFocusState,
          createDecoration: undefined,
          showAddLinkToolbar: false,
          editDecoration: undefined
        };
      }

      if (tr.getMeta('show-add-link-toolbar') === false) {
        return {
          ...prev,
          link,
          showAddLinkToolbar: false,
          createDecoration: undefined
        };
      }

      if (tr.getMeta('show-edit-link-toolbar') === false) {
        return {
          ...prev,
          link,
          editDecoration: undefined
        };
      }

      let { createDecoration, editDecoration } = prev;

      if (tr.getMeta('show-add-link-toolbar') === true) {
        const { $from, $to } = newState.selection;
        if ($from.pos === $to.pos) {
          const node = document.createElement('span');
          node.className = 'nib-link-marker';
          createDecoration = DecorationSet.create(newState.doc, [
            Decoration.widget($from.pos, node)
          ]);
        } else {
          createDecoration = DecorationSet.create(newState.doc, [
            Decoration.inline($from.pos, $to.pos, {
              class: 'nib-link-marker'
            })
          ]);
        }
        return {
          link,
          editorFocusState: prev.editorFocusState,
          createDecoration,
          showAddLinkToolbar: true
        };
      }

      if (link && link.contained && prev.editorFocusState) {
        if (
          !editDecoration ||
          (prev.link &&
            (prev.link.from !== link.from || prev.link.to !== link.to))
        ) {
          editDecoration = DecorationSet.create(newState.doc, [
            Decoration.inline(link.from, link.to, {
              class: 'nib-edit-link-marker'
            })
          ]);
        }
        return {
          link,
          editDecoration,
          editorFocusState: prev.editorFocusState
        };
      }

      if (!link)
        return {
          ...prev,
          link,
          editDecoration: undefined
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
      focus(view) {
        const { state, dispatch } = view;
        dispatch(state.tr.setMeta('show-add-link-toolbar', false));
        return false;
      }
    }
  }
});
