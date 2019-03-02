import * as test from "prosemirror-tables";

const createCell = (cellType, cellContent) => {
  if (cellContent) return cellType.createChecked(null, cellContent);
  return cellType.createAndFill();
};

export const createTable = (state, dispatch) => {
  var schema = state.schema;
  var rowsCount = 3,
    colsCount = 3,
    withHeaderRow = true,
    cellContent = null;
  const {
    table_cell: tableCell,
    table_header: tableHeader,
    table_row: tableRow,
    table
  } = schema.nodes;

  const cells = [];
  const headerCells = [];
  for (let i = 0; i < colsCount; i++) {
    cells.push(createCell(tableCell, cellContent));

    if (withHeaderRow) {
      headerCells.push(createCell(tableHeader, cellContent));
    }
  }

  const rows = [];
  for (let i = 0; i < rowsCount; i++) {
    rows.push(
      tableRow.createChecked(
        null,
        withHeaderRow && i === 0 ? headerCells : cells
      )
    );
  }

  var newTable = table.createChecked(null, rows);
  dispatch(
    state.tr
      .replaceWith(state.selection.$from.pos, state.selection.$to.pos, newTable)
      .scrollIntoView()
  );

  return true;
};
