import { Plugin, PluginKey, EditorState } from 'prosemirror-state';
import { Mark } from 'prosemirror-model';

export const colorPluginKey = new PluginKey('color');

const getActiveColorMarks = (state: EditorState) => {
  const { selection } = state;
  const { $from, $to } = selection;
  let activeColorMarks: Mark[] = [];
  if (selection.empty) {
    activeColorMarks = [...(state.storedMarks || $to.marks())];
  }
  const { textColor, backgroundColor } = state.schema.marks;
  state.doc.nodesBetween($from.pos, $to.pos, (node) => {
    if (node.marks) {
      activeColorMarks = [...activeColorMarks, ...node.marks];
    }
  });
  return activeColorMarks
    .filter((mark) => mark.type === textColor || mark.type === backgroundColor)
    .reduce((marks, mark) => ({ ...marks, [mark.type.name]: mark }), {});
};

const colorPlugin = new Plugin({
  key: colorPluginKey,

  state: {
    init: (_, state) => {
      const activeColorMarks = getActiveColorMarks(state);
      return { activeColorMarks };
    },
    apply(tr, value, oldState, newState) {
      const oldStoredMarkCount =
        oldState.storedMarks && oldState.storedMarks.length;
      const newStoredMarksCount =
        newState.storedMarks && newState.storedMarks.length;
      if (
        tr.docChanged ||
        oldState.selection !== newState.selection ||
        oldStoredMarkCount !== newStoredMarksCount
      ) {
        const activeColorMarks = getActiveColorMarks(newState);
        return { activeColorMarks };
      }
      return value;
    },
  },
});

export default colorPlugin;
