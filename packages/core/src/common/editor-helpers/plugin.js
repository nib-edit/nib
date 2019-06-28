import Plugins from "../../plugins";

export const getProsemirrorPlugins = plugins => {
  let pluginList = [];
  plugins.forEach(p => {
    if (p) {
      if (p.plugins) {
        pluginList = [...pluginList, ...p.plugins];
      } else if (p.plugin) {
        pluginList = [...pluginList, p.plugin];
      }
    }
  });
  return pluginList;
};

export const getPluginList = plugins =>
  plugins
    .trim()
    .split(" ")
    .map(key => Plugins[key]);

export const getPluginListArr = plugins => plugins.map(key => Plugins[key]);
