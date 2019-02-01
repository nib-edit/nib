import { Schema } from "prosemirror-model";
import { marks, nodes } from "nib-schema";

const getHTMLString = node => {
  let strContent = "";
  for (let i = 0; i < node.childCount; i++) {
    const child = node.child(i);
    strContent += getHTMLString(child);
  }
  if (node.type.spec.toDOM) {
    const tag = node.type.spec.toDOM(node)[0];
    return `<${tag}>${strContent}</${tag}>`;
  } else if (node.text) {
    return node.text;
  }
  return strContent;
};

export const convertToHTML = content => {
  if (JSON.stringify(content) === "{}") return "";
  const schema = new Schema({
    nodes,
    marks
  });
  const node = schema.nodeFromJSON(content);
  return getHTMLString(node);
};
