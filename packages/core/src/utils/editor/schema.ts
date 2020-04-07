import { Schema } from 'prosemirror-model';
import { nodes } from 'nib-schema';
import { IEditorPlugin } from '../../types/components';

export default (plugins: IEditorPlugin[]) => {
  const schema = plugins
    .map((p: IEditorPlugin) => p && p.schema)
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
