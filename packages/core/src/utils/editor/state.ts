import { EditorState } from 'prosemirror-state';

import buildKeymap from './keymap';
import buildSchema from './schema';
import { getProsemirrorPlugins } from './plugins';
import { EditorView } from 'prosemirror-view';
import {
  IProsemirrorViewProvider,
  IProsemirrorDoc,
} from '../../types/prosemirror';
import { IEditorPlugin } from '../../types/components';

const defaultContent = {
  doc: {
    type: 'doc',
    content: [{ type: 'paragraph' }],
  },
  selection: {
    type: 'text',
    anchor: 1,
    head: 1,
  },
};

export const buildEditorState = (
  plugins: IEditorPlugin[],
  content?: IProsemirrorDoc,
  viewProvider?: IProsemirrorViewProvider
) => {
  const editorContent = content || defaultContent;
  return EditorState.fromJSON(
    {
      schema: buildSchema(plugins),
      plugins: [
        buildKeymap(plugins, viewProvider),
        ...getProsemirrorPlugins(plugins),
      ],
    },
    editorContent
  );
};

export const updateEditorState = (view: EditorView, state: EditorState) => {
  view.updateState(state);
  return view;
};
