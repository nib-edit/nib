import { Plugin, PluginKey } from "prosemirror-state";
import { columnResizing, tableEditing, TableMap } from "prosemirror-tables";
import { findParentNodeOfType } from "prosemirror-utils";

import { DecorationSet } from "prosemirror-view";
import getCellDecoration from "./cell-marker";
import getHeaderDecorations from "./header-decorations";

export const tablePluginKey = new PluginKey("table");

export default [
  new Plugin({
    key: tablePluginKey,

    state: {
      init: () => {
        return {};
      },
      apply(tr, prev, oldState, newState) {
        const editorFocused = tr.getMeta("editor-focused");
        if (editorFocused === false) return {};

        // todo: it would be ideal to not use this inner property and
        // re-position dropdown as column resize

        const { schema, selection } = newState;
        const selectedTable = findParentNodeOfType(schema.nodes.table)(
          selection
        );
        if (!selectedTable) return {};

        const selectedColumn = tr.getMeta("select-column");
        const selectedRow = tr.getMeta("select-row");
        const selectedWholeTable = tr.getMeta("select-table");
        if (
          !selectedWholeTable &&
          selectedColumn === undefined &&
          selectedRow === undefined &&
          oldState.selection.head === newState.selection.head &&
          prev.selectedTable &&
          prev.selectedTable.pos === selectedTable.pos &&
          prev.selectedTable.node.nodeSize === selectedTable.node.nodeSize
        )
          return prev;

        const { selectedCell, cellDecoration } = getCellDecoration(
          tr,
          newState
        );
        const headerDecorations = getHeaderDecorations(
          newState,
          selectedWholeTable,
          selectedColumn,
          selectedRow
        );
        const decorations = [cellDecoration, ...headerDecorations];

        if (decorations.length) {
          return {
            decorations: DecorationSet.create(newState.doc, [
              cellDecoration,
              ...headerDecorations,
            ]),
            selectedCell,
            selectedTable,
            selectedTableMap: selectedTable && TableMap.get(selectedTable.node),
          };
        }
        return prev;
      },
    },

    props: {
      decorations(state) {
        const tablePluginState = state && tablePluginKey.getState(state);
        return tablePluginState.decorations;
      },
    },
  }),
  columnResizing(),
  tableEditing(),
];
