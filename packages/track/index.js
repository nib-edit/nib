import trackPlugin from "./src/trackPlugin";
import { doCommit, getTrackedState, revertCommit } from "./src/utils";
import ViewStore from "./src/ViewStore";

export default {
  doCommit,
  revertCommit,
  getTrackedState,
  listener: ViewStore.setView,
  plugin: {
    name: "track",
    plugin: trackPlugin
  }
};
