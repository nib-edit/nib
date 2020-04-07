import { getPluginArray } from './plugins';
import { IAddon } from '../../types/addon';
import { IEditorPlugin } from '../../types/components';

export default (
  pluginOption: string,
  toolbarOptions: string,
  addons: IAddon[] = []
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
    (plugin: IEditorPlugin) => ({
      name: plugin.name,
      toolbarComponent: plugin.toolbarComponent,
    })
  );
};
