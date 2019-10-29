import * as TableCommands from "prosemirror-tables";

export default () => ({
  Tab: TableCommands.goToNextCell(1),
  "Shift-Tab": TableCommands.goToNextCell(-1)
});
