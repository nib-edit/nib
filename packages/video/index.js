import pmPlugin from "./src/plugin";
import schema from "./src/schema";
import styles from "./src/styles";
import toolbarComponent from "./src/ToolbarComponent";

export default {
  name: "video",
  pmPlugin,
  schema,
  styles,
  toolbarComponent,
  view: undefined,
  viewUpdateCallback(newView) {
    this.view = newView;
  },
};
