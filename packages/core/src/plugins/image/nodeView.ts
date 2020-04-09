import { Node } from 'prosemirror-model';
import { NodeView } from 'prosemirror-view';

export default class ImageView implements NodeView {
  dom: HTMLDivElement | undefined = undefined;
  private imageWrapper: HTMLDivElement | undefined = undefined;
  private image: HTMLImageElement | undefined = undefined;

  constructor(private node: Node) {
    this.dom = document.createElement('div');
    this.dom.className = 'nib-image-outer-wrapper';
    this.dom.tabIndex = -1;

    this.imageWrapper = document.createElement('div');
    this.imageWrapper.className = 'nib-image-wrapper';
    this.dom.appendChild(this.imageWrapper);

    this.image = document.createElement('img');
    this.image.src = node.attrs.src;
    this.image.style.height = node.attrs.height;
    this.imageWrapper.appendChild(this.image);
  }

  update = () => true;

  selectNode = () => {
    if (this.image) this.image.style.outline = '2px solid #2962ff';
  };

  deselectNode = () => {
    if (this.image) this.image.style.outline = '';
  };

  destroy = () => {
    this.imageWrapper?.removeChild(this.image!);
    this.dom?.removeChild(this.imageWrapper!);
  };
}
