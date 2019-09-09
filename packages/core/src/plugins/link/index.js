import keymaps, { KeymapInfo } from "./keymaps";
import pmPlugin from "./plugin";
import CreatePopup from "./popups/Create";
import EditPopup from "./popups/Edit";
import schema from "./schema";
import toolbarComponent from "./ToolbarComponent";

export default {
  KeymapInfo,
  keymaps,
  name: "link",
  pmPlugin,
  popups: [CreatePopup, EditPopup],
  schema,
  toolbarComponent
};
