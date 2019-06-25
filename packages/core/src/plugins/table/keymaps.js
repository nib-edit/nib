import * as TableCommands from "prosemirror-tables";

export default {
  Tab: TableCommands.goToNextCell(1),
  "shift-Tab": TableCommands.goToNextCell(-1)
};
