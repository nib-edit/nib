import {
  liftListItem,
  splitListItem,
  wrapInList
} from "prosemirror-schema-list";

const liftToRoot = (listType, view) => {
  let selPos = view.state.selection.$from.depth;
  while (selPos > 1) {
    liftListItem(listType)(view.state, view.dispatch);
    selPos = view.state.selection.$from.depth;
  }
  return true;
};

export const toggleListCmd = (view, listTypeName) => {
  const { state, dispatch } = view;
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
      liftListItem(nodes.listItem)(view.state, view.dispatch);
      return wrapInList(nodes[listTypeName])(view.state, dispatch);
    }
    return liftToRoot(nodes.listItem, view);
  }
  return wrapInList(nodes[listTypeName])(state, dispatch);
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
