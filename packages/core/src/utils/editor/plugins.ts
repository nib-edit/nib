import { Plugin } from 'prosemirror-state';

import Plugins from '../../plugins';
import { EditorPlugin } from '../../types/application';
import { Addon } from '../../types/addon';

export const getProsemirrorPlugins = (plugins: EditorPlugin[]) => {
  let pluginList: Plugin[] = [];
  plugins.forEach((p) => {
    if (p) {
      if (p.pmPlugins) {
        pluginList = [...pluginList, ...p.pmPlugins];
      } else if (p.pmPlugin) {
        pluginList = [...pluginList, p.pmPlugin];
      }
    }
  });
  return pluginList;
};

export const getPluginList = (plugins: string) =>
  plugins
    .trim()
    .split(' ')
    .reduce((pluginList, plugin) => {
      if (pluginList && pluginList.indexOf(plugin) < 0) {
        pluginList.push(plugin);
      }
      return pluginList;
    }, [] as string[])
    .map((key) => Plugins[key]);

export const getPluginArray = (plugins: string[], addons: Addon[]) =>
  plugins.map(
    (key) => Plugins[key] || addons.find((a: Addon) => a.name === key)
  );
