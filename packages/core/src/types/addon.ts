// todo: more details to be added to this interface

import { ElementType } from 'react';
import { EditorPopup } from './components';
import { ProsemirrorDoc } from 'nib-core/src/types/prosemirror';
import { EditorState, Transaction } from 'prosemirror-state';
import { KeyValue } from 'nib-core/src/types/common';
import { EditorView } from 'prosemirror-view';

export interface Addon {
  createStateFromDoc?: (fn: (doc: ProsemirrorDoc) => void) => void;
  dispatchTransactionCallback?: (
    editorState: EditorState,
    tr: Transaction
  ) => EditorState;
  getSerializableState?: () => KeyValue;
  init?: (defaultValue: KeyValue) => void;
  name: string;
  updateLicenseInfo?: (editorRef: HTMLDivElement, licenseKey?: string) => void;
  viewUpdateCallback?: (view: EditorView) => void;
  popups?: EditorPopup[];
  toolbar: ElementType[];
}
