import { ElementType } from 'react';
import { Plugin } from 'prosemirror-state';
import { NodeType, MarkType } from 'prosemirror-model';

import { EditorStyle } from './editor-style';
import { ProsemirrorCommand, ProsemirrorViewProvider } from './prosemirror';

export interface KeymapData {
  key: string;
  label?: string;
}

export interface KeymapDataMap {
  [key: string]: KeymapData;
}

export interface PluginStyleFn {
  (theme: EditorStyle): string;
}

export interface EditorKeymap {
  (viewProvider?: ProsemirrorViewProvider): {
    [key: string]: ProsemirrorCommand;
  };
}

export interface EditorKeymapCommand {
  [key: string]: ProsemirrorCommand;
}

interface PluginSchem {
  nodes?: { [key: string]: NodeType };
  marks?: { [key: string]: MarkType };
}

export interface EditorPlugin {
  name: string;
  toolbarComponent?: ElementType;
  keymaps?: EditorKeymap;
  KeymapInfo?: KeymapDataMap;
  pmPlugins?: Plugin[];
  pmPlugin?: Plugin;
  schema?: PluginSchem;
  styles?: PluginStyleFn;
}
