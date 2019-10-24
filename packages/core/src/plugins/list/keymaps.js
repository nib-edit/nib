import { sinkListItem, liftListItem } from "prosemirror-schema-list";
import { toggleListCmd, splitListItemCmd } from "./commands";

export default {
  "Mod-Shift-7": (state, dispatch) => {
    return toggleListCmd("orderedList")(state, dispatch);
  },
  "Mod-Shift-8": (state, dispatch) => {
    return toggleListCmd("bulletList")(state, dispatch);
  },
  Enter: (state, dispatch) => {
    return splitListItemCmd()(state, dispatch);
  },
  Tab: (state, dispatch) => {
    return sinkListItem(state.schema.nodes.listItem)(state, dispatch);
  },
  "Shift-Tab": (state, dispatch) => {
    return liftListItem(state.schema.nodes.listItem)(state, dispatch);
  }
};

export const KeymapInfo = {
  orderedList: { key: "Mod-Shift-7", label: "Numbered List" },
  bulletList: { key: "Mod-Shift-8", label: "Bullet List" }
};
