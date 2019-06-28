import {getPluginListArr} from "./plugin";

export const getToolbarOptions = (pluginOption, toolbarOptions) => {
  const pluginOpt = pluginOption.trim().split(" ");
  const toolbarOpt = toolbarOptions.trim().split(" ");
  const supportedOptions = toolbarOpt.filter(
    opt => pluginOpt.indexOf(opt) >= 0 || opt === "history"
  );

  return getPluginListArr(supportedOptions).map(plugin => ({
    name: plugin.name,
    toolbarComponent: plugin.toolbarComponent
  }));
};
