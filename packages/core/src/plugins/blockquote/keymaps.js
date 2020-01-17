import { insertParagraphCmd, wrapInBlockquoteCmd } from './commands';

export default () => ({
  Enter: (state, dispatch) => insertParagraphCmd(state, dispatch),
  "Mod-'": (state, dispatch) => {
    return wrapInBlockquoteCmd(state, dispatch);
  },
});

export const KeymapInfo = {
  insertBlockquote: { key: "Mod-'", label: 'Insert Blockquote' },
};
