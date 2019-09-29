import keymaps from "./keymaps";
import pmPlugins from "./plugins";
import CellMenu from "./popups/CellMenu";
import TableMenu from "./popups/TableMenu";
import schema from "./schema";
import styles from "./styles";
import toolbarComponent from "./ToolbarComponent";

export default {
  keymaps,
  name: "table",
  pmPlugins,
  popups: [CellMenu, TableMenu],
  schema,
  styles,
  toolbarComponent
};

// todo: tinymce like table menu
// todo: menu to re-locate on page resize
// todo: table menu to close on esc click
