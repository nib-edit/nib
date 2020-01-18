import { Plugin, PluginKey } from 'prosemirror-state';
import ImageView from './nodeView';

const imagePluginKey = new PluginKey('image');

const imagePlugin = new Plugin({
  key: imagePluginKey,

  state: {
    init: () => {
      return { showImageModal: false };
    },
    apply(tr, prev) {
      if (tr.getMeta('show-image-modal') === true) {
        return {
          showImageModal: true,
        };
      }

      if (tr.getMeta('show-image-modal') === false) {
        return {
          showImageModal: false,
        };
      }

      return prev;
    },
  },
  props: {
    nodeViews: {
      image(node, view, getPos) {
        return new ImageView(node, view, getPos);
      },
    },
  },
});

export default imagePlugin;
export { imagePluginKey };
