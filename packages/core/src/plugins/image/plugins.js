import { Plugin, PluginKey } from "prosemirror-state";

export const imagePluginKey = new PluginKey("image");

export default new Plugin({
  key: imagePluginKey,

  state: {
    init: () => {
      return { showImageToolbar: false };
    },
    apply(tr) {
      const showImageToolbar = tr.getMeta("SHOW_IMAGE_TOOLBAR");
      return { showImageToolbar };
    }
  }
});
