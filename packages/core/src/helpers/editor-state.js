import { EditorState } from "prosemirror-state";

import { buildKeymap } from "./keymap";
import { buildPlugins } from "./plugin";
import { buildSchema } from "./schema";

const defaultContent = {
  type: "doc",
  content: [{ type: "paragraph" }]
};

export const buildEditorState = (plugins, content) =>
  EditorState.fromJSON(
    {
      schema: buildSchema(plugins),
      plugins: [buildKeymap(plugins), ...buildPlugins(plugins)]
    },
    {
      doc: content || defaultContent,
      selection: { type: "text", anchor: 1, head: 1 }
    }
  );

export const updateEditorState = (view, tr) => {
  const editorState = view.state.apply(tr);
  view.updateState(editorState);
  return view;
};
