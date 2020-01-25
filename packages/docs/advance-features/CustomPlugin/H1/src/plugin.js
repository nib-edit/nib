import { Plugin, PluginKey } from 'prosemirror-state';

const heading1PluginKey = new PluginKey('heading1');

const heading1Plugin = new Plugin({
  key: heading1PluginKey,

  state: {
    init: () => {
      return {};
    },
    apply(tr, prev) {
      return prev;
    },
  },
});

export default heading1Plugin;
export { heading1PluginKey };
