import {
  findParentNodeOfType,
  isColumnSelected,
  isRowSelected,
  isTableSelected,
} from 'prosemirror-utils';
import { TableMap } from 'prosemirror-tables';
import { Decoration } from 'prosemirror-view';

export default (state, selectedTable, selectedColumn, selectedRow) => {
  const decorations = [];
  const { schema, selection } = state;
  const parentTable = findParentNodeOfType(schema.nodes.table)(selection);
  if (!parentTable) return null;
  const parentStart = parentTable.start;

  const tableMap = TableMap.get(parentTable.node);
  for (let i = 0; i < tableMap.width; i += 1) {
    const div = document.createElement('div');
    div.classList.add('nib-table_header_ext_top');
    if (selectedTable || selectedColumn === i || isColumnSelected(i)(selection))
      div.classList.add('nib-table_header_ext_top_selected');
    if (i === tableMap.width - 1)
      div.classList.add('nib-table_header_ext_top_last');
    decorations.push(Decoration.widget(parentStart + tableMap.map[i] + 1, div));
  }

  for (let i = 0; i < tableMap.height; i += 1) {
    const div = document.createElement('div');
    div.classList.add('nib-table_header_ext_left');
    if (selectedTable || selectedRow === i || isRowSelected(i)(selection))
      div.classList.add('nib-table_header_ext_left_selected');
    if (i === tableMap.height - 1)
      div.classList.add('nib-table_header_ext_left_last');
    decorations.push(
      Decoration.widget(parentStart + tableMap.map[i * tableMap.width] + 1, div)
    );
  }

  const div = document.createElement('div');
  div.classList.add('nib-table_header_ext_top_left');
  if (selectedTable || isTableSelected(selection))
    div.classList.add('nib-table_header_ext_top_left_selected');
  decorations.push(Decoration.widget(parentStart + tableMap.map[0] + 1, div));

  return decorations;
};
