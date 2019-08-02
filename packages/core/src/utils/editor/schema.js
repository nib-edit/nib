import { Schema } from "prosemirror-model";
import { marks, nodes as nibNodes } from "nib-schema";

export default plugins => {
  const schema = plugins
    .map(p => p && p.schema)
    .reduce(
      (result, s) => {
        const newResult = result;
        if (s) {
          newResult.nodes = [...result.nodes, ...(s.nodes || [])];
          newResult.marks = [...result.marks, ...(s.marks || [])];
        }
        return newResult;
      },
      { nodes: ["paragraph"], marks: [] }
    );
  schema.marks = schema.marks.reduce((result, mark) => {
    const newResult = result;
    newResult[mark] = marks[mark];
    return newResult;
  }, {});
  schema.nodes = schema.nodes.reduce((result, node) => {
    const newResult = result;
    newResult[node] = nibNodes[node];
    return newResult;
  }, {});
  return new Schema(schema);
};
