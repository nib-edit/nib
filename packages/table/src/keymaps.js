import * as TableCommands from 'prosemirror-tables';

import createTable from './commands';

export default () => ({
  'Shift-Alt-t': createTable,
  Tab: TableCommands.goToNextCell(1),
  'Shift-Tab': TableCommands.goToNextCell(-1),
});

export const KeymapInfo = {
  image: { key: 'Shift-Alt-T', label: 'Insert Table' },
};
