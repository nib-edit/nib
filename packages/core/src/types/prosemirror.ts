import { IKeyValue } from './common';
import { EditorView } from 'prosemirror-view';
import { EditorState, Transaction } from 'prosemirror-state';

export interface IProsemirrorDoc extends IKeyValue {}

export interface IProsemirrorEditorState {
  pmview: EditorView;
}

export interface IProsemirrorCommand {
  (state: EditorState, dispatch: IProsemirrorDispatch): boolean | void;
}

export interface IProsemirrorViewProvider {
  (): EditorView<any> | undefined;
}

export interface IProsemirrorDispatch {
  (tr: Transaction): void;
}
