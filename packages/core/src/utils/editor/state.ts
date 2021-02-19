import { EditorState } from "prosemirror-state";

import buildKeymap from "./keymap";
import buildSchema from "./schema";
import { getProsemirrorPlugins } from "./plugins";
import { EditorView } from "prosemirror-view";
import {
  ProsemirrorViewProvider,
  ProsemirrorDoc,
} from "../../types/prosemirror";
import { EditorPlugin } from "../../types/application";

const defaultContent = {
  doc: {
    type: "doc",
    content: [{ type: "paragraph" }],
  },
  selection: {
    type: "text",
    anchor: 1,
    head: 1,
  },
};

export const buildEditorState = (
  plugins: EditorPlugin[],
  content?: ProsemirrorDoc,
  viewProvider?: ProsemirrorViewProvider
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
