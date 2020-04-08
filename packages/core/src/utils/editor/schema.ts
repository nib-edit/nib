import { Schema } from 'prosemirror-model';
import { nodes } from 'nib-schema';
import { EditorPlugin } from '../../types/application';

export default (plugins: EditorPlugin[]) => {
  const schema = plugins
    .map((p: EditorPlugin) => p && p.schema)
    .reduce(
      (result, s) => {
        const newResult = result;
        if (s) {
          newResult.nodes = { ...result.nodes, ...(s.nodes || {}) };
          newResult.marks = { ...result.marks, ...(s.marks || {}) };
        }
        return newResult;
      },
      { nodes: { paragraph: nodes.paragraph }, marks: {} }
    );
  return new Schema(schema);
};
