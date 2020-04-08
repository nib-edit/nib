import {
  ProsemirrorCommand,
  ProsemirrorDispatch,
} from '../../types/prosemirror';
import { EditorState } from 'prosemirror-state';

const showHelp = (): ProsemirrorCommand => (state, dispatch) => {
  dispatch(state.tr.setMeta('show-help-modal', true));
};

export default () => ({
  'Mod-/': (state: EditorState, dispatch: ProsemirrorDispatch) =>
    showHelp()(state, dispatch),
});

export const KeymapInfo = {
  help: { key: 'Mod-/', label: 'Help' },
};
