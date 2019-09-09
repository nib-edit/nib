import Plugins from "../../plugins";

export const getProsemirrorPlugins = plugins => {
  let pluginList = [];
  plugins.forEach(p => {
    if (p) {
      if (p.pmPlugins) {
        pluginList = [...pluginList, ...p.pmPlugins];
      } else if (p.pmPlugin) {
        pluginList = [...pluginList, p.pmPlugin];
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

export const getPluginArray = plugins => plugins.map(key => Plugins[key]);
