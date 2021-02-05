import toolbarComponent from "./src/ToolbarComponent";

export default {
  name: "sourceedit",
  toolbarComponent,
  view: undefined,
  viewUpdateCallback(newView) {
    this.view = newView;
  },
};
