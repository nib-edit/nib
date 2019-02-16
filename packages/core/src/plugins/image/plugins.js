import { Plugin, PluginKey } from "prosemirror-state";

export const imagePluginKey = new PluginKey("image");

export default new Plugin({
  key: imagePluginKey,

  state: {
    init: () => {
      return { showImageToolbar: false };
    },
    apply(tr, value) {
      const showImageToolbar = tr.getMeta("SHOW_IMAGE_TOOLBAR");
      if (showImageToolbar) return { showImageToolbar: true };
      if (showImageToolbar === false) return { showImageToolbar: false };
      return value;
    }
  }
});

// todo: for all meta SHOW_... add corresponding HIDE...
// todo: add keywords to all package.json
