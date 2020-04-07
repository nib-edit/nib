import Plugins from '../../plugins';
import { IAddon } from '../../types/addon';
import { IEditorTheme } from '../../types/editor-theme';
import { PluginKeyType } from '../../types/application';

export default (plugins: string, addons: IAddon[]) => {
  const pluginArray = plugins
    .trim()
    .split(' ')
    .map((p) => p && Plugins[p as PluginKeyType]);
  const styles = [...pluginArray, ...addons].reduce((styleArray, plugin) => {
    if (plugin.styles) styleArray.push(plugin.styles);
    return styleArray;
  }, []);
  styles.push(Plugins.common.styles);
  return (theme: IEditorTheme) =>
    styles.reduce(
      (styleStr: string, styleFn: (theme: IEditorTheme) => string) =>
        `${styleStr}${styleFn(theme)}`,
      ''
    );
};
