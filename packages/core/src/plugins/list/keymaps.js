import { toggleListCmd, splitListItemCmd } from "./commands";
import { sinkListItem, liftListItem } from "prosemirror-schema-list";

export default {
  "mod-shift-7": (state, dispatch) => {
    return toggleListCmd("orderedList")(state, dispatch);
  },
  "mod-shift-8": (state, dispatch) => {
    return toggleListCmd("bulletList")(state, dispatch);
  },
  Enter: (state, dispatch) => {
    return splitListItemCmd()(state, dispatch);
  },
  Tab: (state, dispatch) => {
    return sinkListItem(state.schema.nodes.listItem)(state, dispatch);
  },
  "shift-Tab": (state, dispatch) => {
    return liftListItem(state.schema.nodes.listItem)(state, dispatch);
  }
};

export const KeymapInfo = {
  orderedList: { key: "mod-shift-7", label: "Numbered List" },
  bulletList: { key: "mod-shift-8", label: "Bullet List" }
};
