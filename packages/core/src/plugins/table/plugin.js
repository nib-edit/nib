import { Plugin, PluginKey } from "prosemirror-state";

export const tablePluginKey = new PluginKey("table");

export default new Plugin({
  key: tablePluginKey
});
