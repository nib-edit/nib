import { TextSelection } from "prosemirror-state";

const selectAll = () => (state, dispatch) => {
  const { tr, doc } = state;
  dispatch(
    tr.setSelection(
      new TextSelection(doc.resolve(0), doc.resolve(doc.content.size - 1))
    )
  );
  return true;
};

export default {
  // "Mod-a": (editorState, dispatch) => selectAll()(editorState, dispatch)
};
