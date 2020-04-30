import getOS from '../../utils/device';
import Plugins from './pluginList';
import { KeymapInfo } from './keymaps';
import { EditorPlugin } from '../../types/application';
import { Addon } from '../../types/addon';

export const getPluginList = (plugins: string): EditorPlugin[] =>
  plugins
    .trim()
    .split(' ')
    .filter((p) => p !== 'help')
    .map((key) => Plugins[key]);

export const getKeymapInfo = (plugins: string, addons?: Addon[]) => {
  const pluginList = getPluginList(plugins)
    .filter((plugin) => plugin.KeymapInfo)
    .map((plugin) => ({
      name: plugin.name,
      keymaps: plugin.KeymapInfo && Object.values(plugin.KeymapInfo),
    }));
  addons &&
    addons.forEach(({ name, KeymapInfo }) => {
      if (KeymapInfo)
        pluginList.push({
          name,
          keymaps: Object.values(KeymapInfo),
        });
    });
  pluginList.push({
    name: 'help',
    keymaps: Object.values(KeymapInfo),
  });
  return pluginList;
};

export const formatKey = (key: string) => {
  const os = getOS();
  let mod = '⌘';
  if (os === 'Windows') {
    mod = '^';
  }
  let formattedKey = key.replace('Mod', mod);
  formattedKey = formattedKey.replace(/-/g, ' + ');
  formattedKey = formattedKey.replace('Shift', '⇧');
  formattedKey = formattedKey.replace('Alt', '⌥');
  return formattedKey;
};
