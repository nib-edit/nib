import { getPluginList } from "./plugins";

export default (plugins, property) =>
  plugins &&
  getPluginList(plugins).reduce((result, plugin) => {
    if (!plugin[property]) return result;
    return [...result, ...plugin[property]];
  }, []);
