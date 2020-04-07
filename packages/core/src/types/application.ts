import { EditorStyle } from './editor-style';

export interface KeymapInfoType {
  key: string;
  label?: string;
}

export interface KeymapInfoMap {
  [key: string]: KeymapInfoType;
}

export interface PluginStyleFunction {
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
