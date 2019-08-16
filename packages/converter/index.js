import { Schema } from "prosemirror-model";
import { marks, nodes } from "nib-schema";

const getHTMLString = node => {
  const { type, text } = node;
  if (text) {
    let strContent = text;
    for (let i = 0; i < node.marks.length; i += 1) {
      const mark = node.marks[i];
      const { type: markType } = mark;
      const domDetails = markType.spec.toDOM(mark);
      const htmlAttrs = Object.keys(domDetails[1]).reduce(
        (str, key) => `${str}${key}="${domDetails[1][key]}"`,
        ""
      );
      const htmlTag = domDetails[0];
      strContent = `<${htmlTag}${htmlAttrs}>${strContent}</${htmlTag}>`;
    }
    return strContent;
  }
  let strContent = "";
  for (let i = 0; i < node.childCount; i += 1) {
    const childNode = node.child(i);
    strContent += getHTMLString(childNode);
  }
  if (type.spec.toDOM) {
    const domDetails = type.spec.toDOM(node);
    let htmlAttrs;
    if (domDetails.length > 1)
      htmlAttrs = Object.keys(domDetails[1]).reduce(
        (str, key) => `${str} ${key}="${domDetails[1][key]}"`,
        ""
      );
    const htmlTag = domDetails[0];
    strContent = `<${htmlTag}${htmlAttrs}>${strContent}</${htmlTag}>`;
  }
  return strContent;
};

const convertToHTML = content => {
  if (JSON.stringify(content) === "{}") return "";
  const schema = new Schema({
    nodes,
    marks
  });
  const node = schema.nodeFromJSON(content);
  return getHTMLString(node);
};

export default { convertToHTML };
