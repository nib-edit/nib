import { tableNodes } from 'prosemirror-tables';

// eslint-disable-next-line camelcase
const table_nodes = tableNodes({
  tableGroup: 'block',
  cellContent: 'block+',
});

// eslint-disable-next-line camelcase
export const { table } = table_nodes;

// eslint-disable-next-line camelcase
export const { table_row } = table_nodes;

// eslint-disable-next-line camelcase
export const { table_cell } = table_nodes;

// eslint-disable-next-line camelcase
export const { table_header } = table_nodes;
