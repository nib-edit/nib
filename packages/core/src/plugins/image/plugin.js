import { Plugin, PluginKey } from "prosemirror-state";

export const imagePluginKey = new PluginKey("image");

export default new Plugin({
  key: imagePluginKey,

  state: {
    init: () => {
      return { imageToolbarVisible: false };
    },
    apply(tr, value) {
      if (tr.getMeta("SHOW_IMAGE_TOOLBAR"))
        return { imageToolbarVisible: true };
      if (tr.getMeta("HIDE_IMAGE_TOOLBAR"))
        return { imageToolbarVisible: false };
      return value;
    }
  }
});
