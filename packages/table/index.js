import pmPlugins from "./src/plugins";
import TableMenu from "./src/popups/TableMenu";
import CellMenu from "./src/popups/CellMenu";
import TablePortals from "./src/portals/TableBorders";
import schema from "./src/schema";
import styles from "./src/styles";
import toolbarComponent from "./src/ToolbarComponent";
import keymaps, { KeymapInfo } from "./src/keymaps";

export default {
  name: "table",
  pmPlugins,
  popups: [TableMenu, CellMenu],
  portals: [TablePortals],
  schema,
  styles,
  toolbarComponent,
  view: undefined,
  KeymapInfo,
  keymaps,
  viewUpdateCallback(newView) {
    this.view = newView;
  },
};

// todo: tinymce like table menu
// todo: menu to re-locate on page resize
// todo: table menu to close on esc click
