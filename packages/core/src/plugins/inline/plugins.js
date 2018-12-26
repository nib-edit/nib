import { Plugin, PluginKey } from "prosemirror-state";

export const inlinePluginKey = new PluginKey("inline");

const getActiveMarks = editorState => {
  const { $from, $to } = editorState.selection;
  let activeMarks = [];
  const storedMarks = editorState.storedMarks;
  if (storedMarks) {
    activeMarks = storedMarks.map(mark => mark.type.name);
  }
  editorState.doc.nodesBetween($from.pos - 1, $to.pos, node => {
    if (node.marks) {
      activeMarks = [...activeMarks, ...node.marks.map(mark => mark.type.name)];
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

export default [inlinePlugin];
