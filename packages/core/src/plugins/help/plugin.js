import {Plugin, PluginKey} from "prosemirror-state";

export const helpPluginKey = new PluginKey("help");

export default new Plugin({
  key: helpPluginKey,

  state: {
    init: () => {
      return {helpVisible: false};
    },
    apply(tr, value) {
      if (tr.getMeta("SHOW_HELP_MODAL")) return {helpVisible: true};
      if (tr.getMeta("HIDE_HELP_MODAL")) return {helpVisible: false};
      return value;
    }
  }
});
