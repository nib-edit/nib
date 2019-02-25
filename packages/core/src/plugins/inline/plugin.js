import { Plugin, PluginKey } from "prosemirror-state";

export const inlinePluginKey = new PluginKey("inline");

const getActiveMarks = state => {
  const { selection } = state;
  const { $from, $to } = selection;
  let activeMarks = [];
  if (selection.empty) {
    activeMarks = [...(state.storedMarks || $to.marks())];
  }
  state.doc.nodesBetween($from.pos, $to.pos, node => {
    if (node.marks) {
      activeMarks = [...activeMarks, ...node.marks];
    }
  });
  return activeMarks;
};

const inlinePlugin = new Plugin({
  key: inlinePluginKey,

  state: {
    init: (_, state) => {
      const activeMarks = getActiveMarks(state);
      return { activeMarks };
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
        const activeMarks = getActiveMarks(newState);
        return { activeMarks };
      }
      return value;
    }
  }
});

export default inlinePlugin;
