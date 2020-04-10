import { Plugin, PluginKey, EditorState } from 'prosemirror-state';

const getSelectedListType = (state: EditorState) => {
  const { bulletList, orderedList } = state.schema.nodes;
  const node = state.selection.$from.node(-2);
  if (node && (node.type === bulletList || node.type === orderedList)) {
    return node.type;
  }
  return undefined;
};

export const listPluginKey = new PluginKey('list');

export default new Plugin({
  key: listPluginKey,

  state: {
    init: (_, state) => {
      const selectedListType = getSelectedListType(state);
      return { selectedListType };
    },
    apply(tr, value, oldState, newState) {
      if (tr.docChanged || oldState.selection !== newState.selection) {
        const selectedListType = getSelectedListType(newState);
        return { selectedListType };
      }
      return value;
    }
  }
});
