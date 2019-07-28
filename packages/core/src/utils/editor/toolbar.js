import { getPluginArray } from "./plugins";

export default (pluginOption, toolbarOptions) => {
  const pluginOpt = pluginOption.trim().split(" ");
  const toolbarOpt = toolbarOptions.trim().split(" ");
  const supportedOptions = toolbarOpt.filter(
    opt => pluginOpt.indexOf(opt) >= 0 || opt === "history"
  );

  return getPluginArray(supportedOptions).map(plugin => ({
    name: plugin.name,
    toolbarComponent: plugin.toolbarComponent
  }));
};
