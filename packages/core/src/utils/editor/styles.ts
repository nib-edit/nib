import Plugins from '../../plugins';
import { Addon } from '../../types/addon';
import { EditorPlugin, PluginStyleFn } from '../../types/application';
import { EditorStyle } from '../../types/editor-style';

export default (plugins: string, addons: Addon[]) => {
  const pluginArray = plugins
    .trim()
    .split(' ')
    .map((p) => p && Plugins[p]);
  const styles = [...pluginArray, ...addons].reduce(
    (styleArray: PluginStyleFn[], plugin: EditorPlugin) => {
      if (plugin.styles) styleArray.push(plugin.styles);
      return styleArray;
    },
    []
  );
  styles.push(Plugins.common.styles!);
  return (theme: EditorStyle) =>
    styles.reduce(
      (styleStr: string, styleFn: PluginStyleFn) =>
        `${styleStr}${styleFn(theme)}`,
      ''
    );
};
