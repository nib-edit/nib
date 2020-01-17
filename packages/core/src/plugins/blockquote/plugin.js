import { Plugin, PluginKey } from 'prosemirror-state';
import { findParentNodeOfType } from 'prosemirror-utils';

const getBlockquoteNode = state => {
  const { selection, schema } = state;
  const { blockquote } = schema.nodes;
  return findParentNodeOfType(blockquote)(selection);
};

export const blockquotePluginKey = new PluginKey('blockquote');

export default new Plugin({
  key: blockquotePluginKey,

  state: {
    init: (_, state) => ({ blockquoteNode: getBlockquoteNode(state) }),
    apply: (_1, _2, _3, newState) => ({
      blockquoteNode: getBlockquoteNode(newState),
    }),
  },
});
