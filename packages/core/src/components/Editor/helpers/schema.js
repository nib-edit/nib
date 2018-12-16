import { Schema } from "prosemirror-model";

const pDOM = ["p", 0];
const nodes = {
  doc: {
    content: "block+"
  },
  paragraph: {
    content: "inline*",
    group: "block",
    parseDOM: [{ tag: "p" }],
    toDOM() {
      return pDOM;
    }
  },
  text: {
    group: "inline"
  }
};

export const buildSchema = plugins => {
  const schema = plugins
    .map(p => p && p.schema)
    .reduce(
      (result, schema) => {
        if (schema) {
          result.nodes = { ...result.nodes, ...schema.nodes };
          result.marks = { ...result.marks, ...schema.marks };
        }
        return result;
      },
      { nodes, marks: {} }
    );
  return new Schema(schema);
};
