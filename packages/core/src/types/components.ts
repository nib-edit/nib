import { ElementType } from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

export interface EditorPopup {
  name: string;
  getMarker: (pmview?: EditorView) => Element;
  condition?: ({ state }: { state: EditorState }) => boolean;
  component: ElementType;
}

export interface EditorPlugin {
  name: string;
  toolbarComponent: ElementType;
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
