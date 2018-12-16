import { toggleListCmd, splitListItemCmd } from "./commands";
import { sinkListItem, liftListItem } from "prosemirror-schema-list";

export default {
  "mod-shift-7": (editorState, dispatch) => {
    return toggleListCmd("orderedList")(editorState, dispatch);
  },
  "mod-shift-8": (editorState, dispatch) => {
    return toggleListCmd("bulletList")(editorState, dispatch);
  },
  Enter: (editorState, dispatch) => {
    return splitListItemCmd()(editorState, dispatch);
  },
  Tab: (editorState, dispatch) => {
    return sinkListItem(editorState.schema.nodes.listItem)(
      editorState,
      dispatch
    );
  },
  "shift-Tab": (editorState, dispatch) => {
    return liftListItem(editorState.schema.nodes.listItem)(
      editorState,
      dispatch
    );
  }
};
