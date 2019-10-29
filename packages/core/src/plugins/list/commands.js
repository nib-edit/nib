import {
  liftListItem,
  splitListItem,
  wrapInList
} from "prosemirror-schema-list";
import * as baseCommand from "prosemirror-commands";

const liftToRoot = (listType, state, dispatch) => {
  let selPos = state.selection.$from.depth;
  while (selPos > 1) {
    liftListItem(listType)(state, dispatch);
    selPos -= 2;
  }
  return true;
};

const wrapIntoList = (state, dispatch, listType) => {
  return baseCommand.autoJoin(
    wrapInList(listType),
    (before, after) => before.type === after.type && before.type === listType
  )(state, dispatch);
};

export const toggleListCmd = (listTypeName, view) => (state, dispatch) => {
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
    return liftToRoot(nodes.listItem, state, dispatch);
  }
  return wrapIntoList(state, dispatch, nodes[listTypeName]);
};

export const splitListItemCmd = () => (state, dispatch) => {
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
