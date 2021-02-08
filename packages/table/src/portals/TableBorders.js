import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import { ThemeProvider } from "emotion-theming";
import {
  addColumnAt,
  selectColumn,
  selectRow,
  selectTable,
  removeColumnAt,
  removeRowAt,
  addRowAt,
  isTableSelected,
} from "prosemirror-utils";
import { ToolbarButton, Icon } from "nib-ui";
import * as TableCommands from "prosemirror-tables";

import { tablePluginKey } from "../plugins";

export default class TableBorders extends PureComponent {
  render() {
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    if (!pmview) return null;
    if (isTableSelected(pmview.state.selection)) return null;

    const portals = [];

    const tableColumnHeader = document.getElementsByClassName(
      "nib-table_header_ext_top"
    );

    if (tableColumnHeader && tableColumnHeader.length) {
      const selectColumnAtIndex = (index) => {
        const { state, dispatch } = pmview;
        const { tr } = state;
        tr.setMeta("select-column", index);
        dispatch(selectColumn(index)(tr));
      };

      const deleteColumnAtIndex = (index) => {
        const { state, dispatch } = pmview;
        const { tr } = state;
        dispatch(removeColumnAt(index)(tr));
      };

      const addColumnAtIndex = (index) => {
        const { state, dispatch } = pmview;
        const { tr } = state;
        dispatch(addColumnAt(index)(tr));
      };
      for (let i = 0; i < tableColumnHeader.length; i += 1) {
        const columnElm = tableColumnHeader[i];
        const columnSelected = columnElm.classList.contains(
          "nib-table_header_ext_top_selected"
        );

        portals.push(
          ReactDOM.createPortal(
            <Wrapper
              onClick={() => selectColumnAtIndex(i)}
              onMouseDown={(evt) => evt.preventDefault()}
            >
              {columnSelected && (
                <ColumnToolbarButton onClick={() => deleteColumnAtIndex(i)}>
                  <Icon name="cross" width="12px" />
                </ColumnToolbarButton>
              )}
              <ColumnAddButton
                type="button"
                onClick={() => addColumnAtIndex(i)}
              >
                <Icon name="smallCircle" className="nib-table-small-circle" />
                <Icon name="add" className="nib-table-add" width="12px" />
              </ColumnAddButton>
            </Wrapper>,
            columnElm
          )
        );
      }
    }

    const tableRowHeader = document.getElementsByClassName(
      "nib-table_header_ext_left"
    );

    if (tableRowHeader && tableRowHeader.length) {
      const selectRowAtIndex = (index) => {
        const { state, dispatch } = pmview;
        const { tr } = state;
        tr.setMeta("select-row", index);
        dispatch(selectRow(index)(tr));
      };

      const deleteRowAtIndex = (index) => {
        const { state, dispatch } = pmview;
        const { tr } = state;
        dispatch(removeRowAt(index)(tr));
      };

      const addRowAtIndex = (index) => {
        const { state, dispatch } = pmview;
        TableCommands.toggleHeader("row")(state, dispatch);
        const { tr } = state;
        dispatch(addRowAt(index)(tr));
      };

      for (let i = 0; i < tableRowHeader.length; i += 1) {
        const rowElm = tableRowHeader[i];
        const rowSelected = rowElm.classList.contains(
          "nib-table_header_ext_left_selected"
        );

        portals.push(
          ReactDOM.createPortal(
            <Wrapper
              onClick={() => selectRowAtIndex(i)}
              onMouseDown={(evt) => evt.preventDefault()}
            >
              {rowSelected && (
                <RowToolbarButton onClick={() => deleteRowAtIndex(i)}>
                  <Icon name="cross" width="12px" />
                </RowToolbarButton>
              )}
              {i !== 0 && (
                <RowAddButton type="button" onClick={() => addRowAtIndex(i)}>
                  <Icon name="smallCircle" className="nib-table-small-circle" />
                  <Icon name="add" className="nib-table-add" width="12px" />
                </RowAddButton>
              )}
            </Wrapper>,
            tableRowHeader[i]
          )
        );
      }
    }

    const tableTop = document.getElementsByClassName(
      "nib-table_header_ext_top_left"
    );

    if (tableTop && tableTop.length) {
      const selectWholeTable = () => {
        const { state, dispatch } = pmview;
        const { tr } = state;
        tr.setMeta("select-table", true);
        dispatch(selectTable(tr));
      };

      portals.push(
        ReactDOM.createPortal(
          <Wrapper
            onClick={selectWholeTable}
            onMouseDown={(evt) => evt.preventDefault()}
          />,
          tableTop[0]
        )
      );
    }

    if (!portals.length) return null;

    const { theme } = this.props;
    return <ThemeProvider theme={theme}>{portals}</ThemeProvider>;
  }
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const ColumnToolbarButton = styled(ToolbarButton)`
  position: absolute;
  top: -24px;
  left: calc(50% - 14px);
  height: 20px;
  width: 20px;
`;

const RowToolbarButton = styled(ToolbarButton)`
  position: absolute;
  left: -24px;
  top: calc(50% - 12px);
  height: 20px;
  width: 20px;
`;

const ColumnAddButton = styled.button`
  cursor: pointer;
  background: none;
  display: flex;
  position: absolute;
  left: -7px;
  top: -16px;
  border: none;
  padding: 4px;
  .nib-table-add {
    display: none;
  }
  &:hover {
    left: -10px;
    top: -28px;
    .nib-table-small-circle {
      display: none;
    }
    .nib-table-add {
      display: block;
    }
  }
`;

const RowAddButton = styled.button`
  cursor: pointer;
  background: none;
  display: flex;
  position: absolute;
  left: -16px;
  top: -7px;
  border: none;
  padding: 4px;
  .nib-table-add {
    display: none;
  }
  &:hover {
    left: -20px;
    top: -14px;
    .nib-table-small-circle {
      display: none;
    }
    .nib-table-add {
      display: block;
    }
  }
`;

TableBorders.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pmstate: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object.isRequired,
};
