import Plugins from '../../plugins';
import { Addon } from '../../types/addon';
import { ThemeType } from '../../types/editor-theme';
import { PluginKeyType } from '../../types/application';

export default (plugins: string, addons: Addon[]) => {
  const pluginArray = plugins
    .trim()
    .split(' ')
    .map((p) => p && Plugins[p as PluginKeyType]);
  const styles = [...pluginArray, ...addons].reduce((styleArray, plugin) => {
    if (plugin.styles) styleArray.push(plugin.styles);
    return styleArray;
  }, []);
  styles.push(Plugins.common.styles);
  return (theme: ThemeType) =>
    styles.reduce(
      (styleStr: string, styleFn: (theme: ThemeType) => string) =>
        `${styleStr}${styleFn(theme)}`,
      ''
    );
};
