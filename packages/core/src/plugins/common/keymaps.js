import { Selection, TextSelection } from "prosemirror-state";

const insertHardBreak = () => (state, dispatch) => {
  const { hardBreak } = state.schema.nodes;
  dispatch(state.tr.replaceSelectionWith(hardBreak.create()));
};

export default () => ({
  "Shift-Enter": (state, dispatch) => insertHardBreak()(state, dispatch),
  "Mod-a": (state, dispatch) => {
    const textSelection = new TextSelection(
      Selection.atStart(state.doc).$anchor,
      Selection.atEnd(state.doc).$head
    );
    dispatch(state.tr.setSelection(textSelection));
    return true;
  }
});

export const KeymapInfo = {
  help: { key: "Shift-Enter", label: "Soft newline" }
};
