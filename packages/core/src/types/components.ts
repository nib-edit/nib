import { ElementType } from 'react';
import { EditorState, Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Schema } from 'prosemirror-model';

import { IProsemirrorCommand, IProsemirrorViewProvider } from './prosemirror';

export interface IEditorPopup {
  name: string;
  getMarker: (pmview?: EditorView) => Element;
  condition?: ({ state }: { state: EditorState }) => boolean;
  component: ElementType;
}

export interface IEditorKeymap {
  (viewProvider?: IProsemirrorViewProvider): {
    [key: string]: IProsemirrorCommand;
  };
}

export interface IEditorKeymapCommand {
  [key: string]: IProsemirrorCommand;
}

export interface IEditorPlugin {
  name: string;
  toolbarComponent: ElementType;
  keymaps: IEditorKeymap;
  pmPlugins?: Plugin[];
  pmPlugin?: Plugin;
  schema: Schema;
}
