import { Schema } from "prosemirror-model";
import { marks, nodes } from "nib-schema";

const getHTMLString = node => {
  const { type, text } = node;
  if (text) {
    let strContent = text;
    for (let i = 0; i < node.marks.length; i++) {
      const mark = node.marks[i];
      const { type } = mark;
      const domDetails = type.spec.toDOM(mark);
      const htmlAttrs = Object.keys(domDetails[1]).reduce(
        (str, key) => `${str} ${key}="${domDetails[1][key]}"`,
        ""
      );
      const htmlTag = domDetails[0];
      strContent = `<${htmlTag} ${htmlAttrs}>${strContent}</${htmlTag}>`;
    }
    return strContent;
  }
  let strContent = "";
  for (let i = 0; i < node.childCount; i++) {
    const childNode = node.child(i);
    strContent += getHTMLString(childNode);
  }
  if (type.spec.toDOM) {
    const htmlTag = type.spec.toDOM(node)[0];
    strContent = `<${htmlTag}>${strContent}</${htmlTag}>`;
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
