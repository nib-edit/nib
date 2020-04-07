import { ElementType } from 'react';
import { EditorState, Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

export interface EditorPopup {
  name: string;
  getMarker: (pmview?: EditorView) => Element;
  condition?: ({ state }: { state: EditorState }) => boolean;
  component: ElementType;
}
