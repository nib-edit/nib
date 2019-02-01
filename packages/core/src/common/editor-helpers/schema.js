import { Schema } from "prosemirror-model";
import { marks, nodes as nibNodes } from "nib-schema";

export const buildSchema = plugins => {
  const schema = plugins
    .map(p => p && p.schema)
    .reduce(
      (result, schema) => {
        if (schema) {
          result.nodes = [...result.nodes, ...(schema.nodes || [])];
          result.marks = [...result.marks, ...(schema.marks || [])];
        }
        return result;
      },
      { nodes: ["paragraph"], marks: [] }
    );
  schema.marks = schema.marks.reduce((result, mark) => {
    result[mark] = marks[mark];
    return result;
  }, {});
  schema.nodes = schema.nodes.reduce((result, node) => {
    result[node] = nibNodes[node];
    return result;
  }, {});
  return new Schema(schema);
};
