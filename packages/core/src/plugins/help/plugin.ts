import { Plugin, PluginKey } from 'prosemirror-state';

export const helpPluginKey = new PluginKey('help');

export default new Plugin({
  key: helpPluginKey,

  state: {
    init: () => {
      return {};
    },
    apply(tr) {
      const showHelpModal = tr.getMeta('show-help-modal');
      return { showHelpModal };
    },
  },
});
