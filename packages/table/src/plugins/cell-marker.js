import { Decoration } from 'prosemirror-view';
import { findParentNode } from 'prosemirror-utils';

export default (tr, state) => {
  const resizing = tr.getMeta('tableColumnResizing$');
  if (resizing && resizing.setDragging) {
    return undefined;
  }

  let decoration;
  const { schema, selection } = state;
  const {
    table_cell: schemaTableCell,
    table_header: schemaTableHeader,
  } = schema.nodes;
  const tableCell = findParentNode(
    ({ type }) => type === schemaTableCell || type === schemaTableHeader
  )(selection);

  if (tableCell) {
    decoration = Decoration.node(
      tableCell.start - 1,
      tableCell.start + tableCell.node.nodeSize - 1,
      {
        class: 'nib-table-cell-marker',
        style: 'position: relative;',
      }
    );
    return { selectedCell: tableCell, cellDecoration: decoration };
  }
  return undefined;
};
