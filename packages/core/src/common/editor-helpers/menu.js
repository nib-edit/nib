import { getPluginList } from "./plugin";

export const buildMenu = plugins =>
  getPluginList(plugins).map(plugin => ({
    name: plugin.name,
    menuComponent: plugin.menus
  }));
