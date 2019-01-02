import Plugins from "../../plugins";

export const getProsemirrorPlugins = plugins =>
  plugins.map(p => p && p.plugins);

export const getPluginList = plugins =>
  plugins.split(" ").map(key => Plugins[key]);
