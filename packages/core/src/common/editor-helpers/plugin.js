import Plugins from "../../plugins";

export const getProsemirrorPlugins = plugins => plugins.map(p => p && p.plugin);

export const getPluginList = plugins =>
  plugins
    .trim()
    .split(" ")
    .map(key => Plugins[key]);
