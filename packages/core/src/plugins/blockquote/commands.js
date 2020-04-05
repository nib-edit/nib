import { findWrapping, liftTarget } from 'prosemirror-transform';
import { Selection } from 'prosemirror-state';

import { blockquotePluginKey } from './plugin';

export const insertParagraphCmd = (state, dispatch) => {
  const { tr, selection } = state;
  const { blockquoteNode } = blockquotePluginKey.getState(state);
  if (blockquoteNode) {
    dispatch(tr.split(selection.$to.pos));
    return true;
  }
  return false;
};

const liftBlockquoteCmd = (state, dispatch) => {
  const { tr } = state;
  const { blockquoteNode } = blockquotePluginKey.getState(state);
  const startPos = tr.doc.resolve(blockquoteNode.start);
  const endPos = tr.doc.resolve(
    blockquoteNode.start +
      blockquoteNode.node.nodeSize -
      blockquoteNode.depth -
      1
  );
  const range = startPos.blockRange(endPos);
  if (range) dispatch(tr.lift(range, liftTarget(range)).scrollIntoView());
  return true;
};

const wrapInBlockquoteCmd = (state, dispatch) => {
  const { tr, selection, schema } = state;
  const { nodes } = schema;
  const { blockquote, paragraph } = nodes;
  const { $from, $to } = selection;
  const range = $from.blockRange($to);
  const wrapping = range && findWrapping(range, blockquote);
  if (wrapping) tr.wrap(range, wrapping).scrollIntoView();
  else {
    tr.replaceRangeWith(
      $to.pos + 1,
      $to.pos + 1,
      blockquote.createAndFill(paragraph.create())
    );
    tr.setSelection(
      Selection.near(tr.doc.resolve(state.selection.to + 1))
    ).scrollIntoView();
  }
  dispatch(tr);
  return true;
};

export const wrapLiftBlockquote = (state, dispatch) => {
  const { blockquoteNode } = blockquotePluginKey.getState(state);
  if (blockquoteNode) return liftBlockquoteCmd(state, dispatch);
  return wrapInBlockquoteCmd(state, dispatch);
};
