import { getPluginList } from "./plugin";

export const getModals = plugins =>
  plugins &&
  getPluginList(plugins).reduce((modals, plugin) => {
    if (!plugin.modals) return modals;
    return [...modals, ...plugin.modals];
  }, []);
