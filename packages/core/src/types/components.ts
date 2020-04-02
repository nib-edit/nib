import { ReactElement } from 'react';
import { EditorState } from 'prosemirror-state';

export interface EditorPopup {
  name: string;
  getMarker: () => HTMLElement | undefined;
  condition?: ({ state }: { state: EditorState }) => boolean;
  component: React.ElementType;
}
