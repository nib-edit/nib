import { ElementType } from 'react';
import { EditorState } from 'prosemirror-state';

export interface EditorPopup {
  name: string;
  getMarker: () => Element;
  condition?: ({ state }: { state: EditorState }) => boolean;
  component: ElementType;
}

export interface ToolbarOption {
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
