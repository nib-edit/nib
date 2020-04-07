import { getPluginList } from './plugins';
import { EditorPlugin } from '../../types/components';
import { KeyValue } from '../../types/common';

export default (plugins: string, property: string) =>
  plugins &&
  getPluginList(plugins).reduce((result: EditorPlugin[], plugin: KeyValue) => {
    if (!plugin[property]) return result;
    return [...result, ...plugin[property]];
  }, []);
