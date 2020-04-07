import { getPluginList } from './plugins';
import { IEditorPlugin } from '../../types/components';
import { IKeyValue } from '../../types/common';

export default (plugins: string, property: string) =>
  plugins &&
  getPluginList(plugins).reduce(
    (result: IEditorPlugin[], plugin: IKeyValue) => {
      if (!plugin[property]) return result;
      return [...result, ...plugin[property]];
    },
    []
  );
