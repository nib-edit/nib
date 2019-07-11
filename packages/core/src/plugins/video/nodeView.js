export default class VideoView {
  constructor(node) {
    this.dom = document.createElement("span");
    this.dom.innerHTML = node.attrs.html;
  }
}
