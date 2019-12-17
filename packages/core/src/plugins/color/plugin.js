import { Plugin, PluginKey } from "prosemirror-state";

export const colorPluginKey = new PluginKey("color");

const getActiveColorMarks = state => {
  const { selection } = state;
  const { $from, $to } = selection;
  let activeColorMarks = [];
  if (selection.empty) {
    activeColorMarks = [...(state.storedMarks || $to.marks())];
  }
  const { textColor, backgroundColor } = state.schema.marks;
  state.doc.nodesBetween($from.pos, $to.pos, node => {
    if (node.marks) {
      activeColorMarks = [...activeColorMarks, ...node.marks];
    }
  });
  activeColorMarks = activeColorMarks
    .filter(mark => mark.type === textColor || mark.type === backgroundColor)
    .reduce((marks, mark) => ({ ...marks, [mark.type.name]: mark }), {});
  return activeColorMarks;
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
    }
  }
});

export default colorPlugin;
