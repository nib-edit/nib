import { ElementType, MutableRefObject } from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

export interface EditorPopup {
  name: string;
  getMarker: (
    editorWrapper: MutableRefObject<HTMLDivElement | null>,
    pmview?: EditorView
  ) => Element | null;
  condition?: ({ state }: { state: EditorState }) => boolean;
  component: ElementType;
}
