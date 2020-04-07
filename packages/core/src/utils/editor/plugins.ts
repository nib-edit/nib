import { Plugin } from 'prosemirror-state';

import Plugins from '../../plugins';
import { IEditorPlugin } from '../../types/components';
import { IAddon } from '../../types/addon';
import { PluginKeyType } from '../../types/application';

export const getProsemirrorPlugins = (plugins: IEditorPlugin[]) => {
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
    .map((key) => Plugins[key as PluginKeyType]);

export const getPluginArray = (plugins: string[], addons: IAddon[]) =>
  plugins.map(
    (key) =>
      Plugins[key as PluginKeyType] ||
      addons.find((a: IAddon) => a.name === key)
  );
