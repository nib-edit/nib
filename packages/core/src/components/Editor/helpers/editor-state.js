import { EditorState } from "prosemirror-state";

import { buildKeymap } from "./keymap";
import { buildPlugins } from "./plugin";
import { buildSchema } from "./schema";

export const buildEditorState = plugins =>
  EditorState.create({
    schema: buildSchema(plugins),
    plugins: [buildKeymap(plugins), ...buildPlugins(plugins)]
  });

export const updateEditorState = (view, tr) => {
  const editorState = view.state.apply(tr);
  view.updateState(editorState);
  return view;
};
