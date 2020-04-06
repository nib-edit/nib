import { KeyValueType } from './common';
import { EditorView } from 'prosemirror-view';
import { EditorState, Transaction } from 'prosemirror-state';

export interface ProsemirrorDoc extends KeyValueType {}

export interface ProsemirrorEditorState {
  pmview: EditorView;
}

export interface ProsemirrorCommand {
  (state: EditorState, dispatch: ProsemirrorDispatch): boolean | void;
}

export interface ProsemirrorViewProvider {
  (): EditorView<any> | undefined;
}

export interface ProsemirrorDispatch {
  (tr: Transaction): void;
}
