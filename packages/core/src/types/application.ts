import { EditorStyle } from './editor-style';

export interface KeymapInfo {
  key: string;
  label?: string;
}

export interface KeymapInfoMap {
  [key: string]: KeymapInfo;
}

export interface PluginStyleFn {
  (theme: EditorStyle): string;
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
