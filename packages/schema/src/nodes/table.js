import { tableNodes } from "prosemirror-tables";

const table_nodes = tableNodes({
  tableGroup: "block",
  cellContent: "block+"
});

export const table = table_nodes.table;
export const table_row = table_nodes.table_row;
export const table_cell = table_nodes.table_cell;
export const table_header = table_nodes.table_header;
