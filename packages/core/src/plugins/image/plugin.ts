import { Plugin, PluginKey } from 'prosemirror-state';
import ImageView from './nodeView';

export const imagePluginKey = new PluginKey('image');

export default new Plugin({
  key: imagePluginKey,

  state: {
    init: () => {
      return { showImageModal: false };
    },
    apply(tr, prev, _, newState) {
      const { selection, schema } = newState;
      if (tr.getMeta('show-image-modal') === true) {
        return {
          ...prev,
          showImageModal: true
        };
      }

      if (tr.getMeta('show-image-modal') === false) {
        return {
          ...prev,
          showImageModal: false
        };
      }

      if (
        selection.$to.node() &&
        selection.$to.node().firstChild &&
        selection.$to.node().firstChild!.type === schema.nodes.image
      ) {
        return {
          ...prev,
          isImageSelected: true
        };
      }

      return {
        ...prev,
        isImageSelected: false
      };
    }
  },
  props: {
    nodeViews: {
      image(node) {
        return new ImageView(node);
      }
    }
  }
});
