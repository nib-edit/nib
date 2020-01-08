import { Schema, DOMParser } from "prosemirror-model";
import { marks, nodes } from "nib-schema";

const schema = new Schema({
  nodes,
  marks
});

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
      strContent = `<${htmlTag} ${htmlAttrs}>${strContent}</${htmlTag}>`;
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
    if (node.type.name === "embed") {
      strContent = `<p style="display:flex;justify-content:center;">${
        domDetails[1]["data-nib-embed"]
      }</p>`;
      return strContent;
    }
    let htmlAttrs = "";
    if (domDetails.length > 1)
      htmlAttrs = Object.keys(domDetails[1]).reduce(
        (str, key) => `${str} ${key}="${domDetails[1][key]}"`,
        htmlAttrs
      );
    const htmlTag = domDetails[0];
    strContent = `<${htmlTag} ${htmlAttrs}>${strContent ||
      "<br>"}</${htmlTag}>`;
    if (node.type.name === "image") {
      strContent = `<p style="text-align: center;">${strContent}<br></p>`;
    }
    if (node.type.name === "hardBreak") {
      // This special case prevents strContent from producing
      // markup that treats <br> like an HTML element that should
      // have an opening and closing tag.
      strContent = "<br>";
    }
  }
  return strContent;
};

const convertToHTML = content => {
  if (JSON.stringify(content) === "{}") return "";
  const node = schema.nodeFromJSON(content);
  return getHTMLString(node);
};

const convertFromHTML = (html = "<p></p>") => {
  if (!document)
    throw new Error("Document object is required to convert from html.");
  const contentWrapper = document.createElement("div");
  document.body.appendChild(contentWrapper);
  contentWrapper.innerHTML = html;
  const parser = DOMParser.fromSchema(schema);
  const content = parser.parse(contentWrapper);
  document.body.removeChild(contentWrapper);
  return {
    doc: content.toJSON(),
    selection: {
      type: "text",
      anchor: 0,
      head: 0
    }
  };
};

export default { convertToHTML, convertFromHTML };
