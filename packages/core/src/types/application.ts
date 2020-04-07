import { IEditorStyle } from './editor-style';

export interface IKeymapInfo {
  key: string;
  label?: string;
}

export interface IKeymapInfoMap {
  [key: string]: IKeymapInfo;
}

export interface IPluginStyleFn {
  (theme: IEditorStyle): string;
}

export type PluginKeyType =
  | 'block'
  | 'blockquote'
  | 'common'
  | 'color'
  | 'help'
  | 'history'
  | 'image'
  | 'inline'
  | 'link'
  | 'list';
