import { getPluginList } from "./plugin";

export const getToolbarOptions = plugins =>
  getPluginList(plugins).map(plugin => ({
    name: plugin.name,
    toolbarComponent: plugin.toolbarComponent
  }));
