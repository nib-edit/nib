import { Plugin, PluginKey } from 'prosemirror-state';
import { findSelectedNodeOfType } from 'prosemirror-utils';

import ImageView from './nodeView';

export const imagePluginKey = new PluginKey('image');

export default new Plugin({
  key: imagePluginKey,

  state: {
    init: () => ({ showImageModal: false }),
    apply(tr, prev, _, newState) {
      const { selection, schema } = newState;
      if (tr.getMeta('show-image-modal') === true)
        return {
          ...prev,
          showImageModal: true
        };

      if (tr.getMeta('show-image-modal') === false)
        return {
          ...prev,
          showImageModal: false
        };

      const { image } = schema.nodes;
      if (findSelectedNodeOfType(image)(selection))
        return {
          ...prev,
          isImageSelected: true
        };

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
