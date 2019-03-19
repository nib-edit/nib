import { getPluginList } from "./plugin";

export const getKeymapInfo = plugins =>
  getPluginList(plugins)
    .filter(plugin => plugin.KeymapInfo)
    .map(plugin => ({
      name: plugin.name,
      keymaps: Object.values(plugin.KeymapInfo)
    }));
