import { getPluginList } from "./plugin";

export const getPropertyFromPliguns = (plugins, property) =>
  plugins &&
  getPluginList(plugins).reduce((result, plugin) => {
    if (!plugin[property]) return result;
    return [...result, ...plugin[property]];
  }, []);
