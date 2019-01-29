import { getPluginList } from "./plugin";

export const buildToolbar = plugins =>
  getPluginList(plugins).map(plugin => ({
    name: plugin.name,
    toolbarComponent: plugin.toolbarComponent
  }));
