const createCell = (cellType, cellContent) => {
  if (cellContent) return cellType.createChecked(null, cellContent);
  return cellType.createAndFill();
};

export const createTable = (state, dispatch) => {
  const {
    table_cell: tableCell,
    table_header: tableHeader,
    table_row: tableRow,
    table
  } = state.schema.nodes;

  const rowsCount = 3;
  const colsCount = 3;
  const cells = [];
  const headerCells = [];
  for (let i = 0; i < colsCount; i++) {
    headerCells.push(createCell(tableHeader));
    cells.push(createCell(tableCell));
  }
  const rows = [];
  for (let i = 0; i < rowsCount; i++) {
    rows.push(tableRow.createChecked(null, i === 0 ? headerCells : cells));
  }

  const newTable = table.createChecked(null, rows);
  const {selection, tr} = state;
  const {$from, $to} = selection;
  dispatch(tr.replaceWith($from.pos, $to.pos, newTable).scrollIntoView());
  return true;
};
