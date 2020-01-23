import { Schema } from 'prosemirror-model';

export default plugins => {
  const schema = plugins
    .map(p => p && p.schema)
    .reduce(
      (result, s) => {
        const newResult = result;
        if (s) {
          newResult.nodes = { ...result.nodes, ...(s.nodes || {}) };
          newResult.marks = { ...result.marks, ...(s.marks || {}) };
        }
        return newResult;
      },
      { nodes: [], marks: [] }
    );
  return new Schema(schema);
};
