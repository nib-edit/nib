import { ElementType } from 'react';
import { EditorState, Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Schema } from 'prosemirror-model';

import { ProsemirrorCommand, ProsemirrorViewProvider } from './prosemirror';

export interface EditorPopup {
  name: string;
  getMarker: (pmview?: EditorView) => Element;
  condition?: ({ state }: { state: EditorState }) => boolean;
  component: ElementType;
}

export interface EditorKeymap {
  (viewProvider?: ProsemirrorViewProvider): {
    [key: string]: ProsemirrorCommand;
  };
}

export interface EditorKeymapCommand {
  [key: string]: ProsemirrorCommand;
}

export interface EditorPlugin {
  name: string;
  toolbarComponent: ElementType;
  keymaps: EditorKeymap;
  pmPlugins?: Plugin[];
  pmPlugin?: Plugin;
  schema: Schema;
}

// {
//   KeymapInfo,
//     keymaps,
//     name: 'block',
//       pmPlugin,
//       schema,
//       styles,
//       toolbarComponent,
// };
