import { KeyValueType } from './common';
import { EditorView } from 'prosemirror-view';

export interface ProsemirrorDoc extends KeyValueType {}

export interface ProsemirrorEditorState {
  pmview: EditorView;
}
