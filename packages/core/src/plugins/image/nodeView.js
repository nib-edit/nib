export default class ImageView {
  constructor(node, view, getPos) {
    this.node = node;
    this.view = view;
    this.getPos = getPos;

    this.dom = document.createElement('div');
    this.dom.className = 'nib-image-outer-wrapper';
    this.dom.tabIndex = -1;

    this.imageWrapper = document.createElement('div');
    this.imageWrapper.className = 'nib-image-wrapper';
    this.dom.appendChild(this.imageWrapper);

    this.img = document.createElement('img');
    this.img.src = node.attrs.src;
    this.img.style = `height:${node.attrs.height};`;
    this.imageWrapper.appendChild(this.img);

    // this.resizeHandles = [];
    // this.dom.addEventListener("click", this.handleClick);
    // this.dom.addEventListener("mousedown", this.handleMouseDown);
    // this.dom.addEventListener("blur", this.cleanupResizeHandles);
  }

  update = node => {
    // if (node.attrs.height === this.prevHeight || !this.resizeHandles.length)
    //   return true;
    // this.prevHeight = node.attrs.height;
    // this.img.style = `height:${node.attrs.height};outline:2px solid #2962ff`;
    return true;
  };

  selectNode = () => {
    if (this.img) this.img.style.outline = '2px solid #2962ff';
  };

  deselectNode = () => {
    if (this.img) this.img.style.outline = '';
  };

  destroy = () => {
    // this.cleanupResizeHandles();
    // this.dom.removeEventListener('click', this.handleClick);
    // this.dom.removeEventListener('mousedown', this.handleMouseDown);
    // this.dom.removeEventListener('blur', this.cleanupResizeHandles);
  };

  handleMouseDown = evt => {
    evt.stopPropagation();
    [
      { className: 'nib-image-resize-lt', dir: -1 },
      { className: 'nib-image-resize-rt', dir: -1 },
      { className: 'nib-image-resize-lb', dir: 1 },
      { className: 'nib-image-resize-rb', dir: 1 },
    ].forEach(({ className, dir }) => {
      const handle = document.createElement('div');
      handle.className = className;
      handle.setAttribute('data-dir', dir);
      this.imageWrapper.appendChild(handle);
      handle.addEventListener('mousedown', this.handleResizeHandleMouseDown);
      this.resizeHandles.push(handle);
    });
    this.img.style.outline = '2px solid #2962ff';
    window.addEventListener('click', this.cleanupResizeHandles);
    window.addEventListener('mousemove', this.handleResizeHandleMouseMove);
    window.addEventListener('mouseup', this.handleResizeHandleMouseUp);
  };

  handleClick = evt => {
    evt.stopPropagation();
  };

  handleResizeHandleMouseUp = () => {
    if (!this.resizing) return;
    this.resizing = false;
    this.dir = undefined;
  };

  handleResizeHandleMouseDown = evt => {
    if (this.resizing) return;
    this.resizing = true;
    this.dir = parseInt(evt.target.getAttribute('data-dir'), 10);
    this.prevPoint = evt.clientY;
    evt.preventDefault();
  };

  handleResizeHandleMouseMove = evt => {
    if (!this.resizing) return;
    const { state, dispatch } = this.view;

    const imageRect = this.img.getBoundingClientRect();
    this.imageHeight = imageRect.height;

    const newHeight =
      this.imageHeight + (evt.clientY - this.prevPoint) * this.dir;
    this.prevPoint = evt.clientY;
    dispatch(
      state.tr.setNodeMarkup(this.getPos(), undefined, {
        ...this.node.attrs,
        height: `${newHeight}px`,
      })
    );
  };

  cleanupResizeHandles = () => {
    this.img.style.outline = 'none';
    this.resizeHandles.forEach(handle => {
      handle.removeEventListener('mousedown', this.handleResizeHandleMouseDown);
      this.imageWrapper.removeChild(handle);
    });
    window.removeEventListener('mousemove', this.handleResizeHandleMouseMove);
    this.resizeHandles = [];
  };
}
