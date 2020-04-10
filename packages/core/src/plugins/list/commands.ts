import {
  liftListItem,
  splitListItem,
  wrapInList
} from 'prosemirror-schema-list';
import * as baseCommand from 'prosemirror-commands';
import { MarkType, Mark } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';

import {
  ProsemirrorDispatch,
  ProsemirrorCommand
} from '../../types/prosemirror';
import { EditorView } from 'prosemirror-view';

const liftToRoot = (
  state: EditorState,
  dispatch: ProsemirrorDispatch,
  listType: MarkType
) => {
  let selPos = state.selection.$from.depth;
  while (selPos > 1) {
    liftListItem(listType)(state, dispatch);
    selPos -= 2;
  }
  return true;
};

const wrapIntoList = (
  state: EditorState,
  dispatch: ProsemirrorDispatch,
  listType: MarkType
) => {
  return baseCommand.autoJoin(
    wrapInList(listType),
    (before: Mark, after: Mark) =>
      before.type === after.type && before.type === listType
  )(state, dispatch);
};

export const toggleListCmd = (
  listTypeName: string,
  view: EditorView
): ProsemirrorCommand => (state, dispatch) => {
  const {
    selection: { $anchor },
    schema: { nodes }
  } = state;
  const listItemTypeNode = $anchor.node($anchor.depth - 2);
  const listItemTypeNodeName = listItemTypeNode && listItemTypeNode.type.name;
  const listItemNode = $anchor.node($anchor.depth - 1);
  const listItemNodeName = listItemNode && listItemNode.type.name;
  if (listItemNodeName === nodes.listItem.name) {
    if (listItemTypeNodeName !== listTypeName) {
      liftListItem(nodes.listItem)(state, dispatch);
      return wrapIntoList(view.state, dispatch, nodes[listTypeName]);
    }
    return liftToRoot(state, dispatch, nodes.listItem);
  }
  return wrapIntoList(state, dispatch, nodes[listTypeName]);
};

export const splitListItemCmd = (): ProsemirrorCommand => (state, dispatch) => {
  const {
    selection: { $anchor },
    schema: { nodes }
  } = state;
  const currentNode = $anchor.node($anchor.depth - 1);
  if (currentNode.type === nodes.listItem) {
    if (currentNode.textContent.length > 0) {
      return splitListItem(nodes.listItem)(state, dispatch);
    }
    return liftListItem(nodes.listItem)(state, dispatch);
  }
  return false;
};
