import { getPluginArray } from './plugins';
import { Addon } from '../../types/addon';
import { EditorPlugin } from '../../types/application';

export default (
  pluginOption: string,
  toolbarOptions: string,
  addons: Addon[] = []
) => {
  const pluginOpt = pluginOption.trim().split(' ');
  const toolbarOpt = toolbarOptions.trim().split(' ');
  const supportedOptions = toolbarOpt.filter(
    (opt) =>
      pluginOpt.indexOf(opt) >= 0 ||
      addons.some((addon) => addon.name === opt) ||
      opt === 'history'
  );

  return getPluginArray(supportedOptions, addons).map(
    (plugin: EditorPlugin) => ({
      name: plugin.name,
      toolbarComponent: plugin.toolbarComponent,
    })
  );
};
