import Plugins from "../plugins";

export const buildPlugins = plugins => {
  return plugins
    .map(p => p && p.plugins)
    .reduce((result, pList) => [...result, ...(pList || [])], []);
};

export const getPluginList = plugins =>
  plugins.split(" ").map(key => Plugins[key]);
