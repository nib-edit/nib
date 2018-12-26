import { linkPluginKey } from "./plugins";

const showLinkToolbar = () => (editorState, dispatch) => {
  dispatch(editorState.tr.setMeta(linkPluginKey, "SHOW_LINK_TOOLBAR"));
};

export default {
  "mod-k": (editorState, dispatch) => showLinkToolbar()(editorState, dispatch)
};
