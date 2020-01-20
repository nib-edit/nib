import { getPluginArray } from './plugins';

export default (pluginOption, toolbarOptions, addons = []) => {
  const pluginOpt = pluginOption.trim().split(' ');
  const toolbarOpt = toolbarOptions.trim().split(' ');
  const supportedOptions = toolbarOpt.filter(
    opt =>
      pluginOpt.indexOf(opt) >= 0 ||
      addons.some(addon => addon.name === opt) ||
      opt === 'history'
  );

  return getPluginArray(supportedOptions, addons).map(plugin => ({
    name: plugin.name,
    toolbarComponent: plugin.toolbarComponent,
  }));
};
