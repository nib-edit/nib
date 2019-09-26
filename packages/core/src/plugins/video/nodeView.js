class VideoView {
  constructor(node) {
    this.dom = document.createElement("div");
    this.dom.className = "nib-video-wrapper";
    this.dom.innerHTML = node.attrs.html;
  }
}

export default VideoView;
