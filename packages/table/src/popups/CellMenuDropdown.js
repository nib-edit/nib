import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from '@emotion/styled';
import * as TableCommands from 'prosemirror-tables';

import { tablePluginKey } from '../plugins';

export default class MenuDropdown extends Component {
  updateTable = (evt) => {
    const cmd = evt.target.getAttribute('name');
    const { pmview, updateMenuPosition } = this.props;
    const { state, dispatch } = pmview;
    TableCommands[cmd](state, dispatch);
    if (cmd === 'toggleHeader') {
      TableCommands.toggleHeader('row')(state, dispatch);
    } else {
      TableCommands[cmd](state, dispatch);
    }
    updateMenuPosition();
  };

  render() {
    const { pmview } = this.props;
    const { selectedCell, selectedTable, selectedTableMap } =
      pmview && tablePluginKey.getState(pmview.state);
    const cell =
      selectedTableMap &&
      selectedTableMap.findCell(selectedCell.pos - selectedTable.start);

    return (
      <MenuWrapper>
        {cell && !cell.top && (
          <MenuOption name="toggleHeader" onClick={this.updateTable}>
            Toggle Header
          </MenuOption>
        )}
        <MenuOption name="addRowAfter" onClick={this.updateTable}>
          Insert Row
        </MenuOption>
        <MenuOption name="addColumnAfter" onClick={this.updateTable}>
          Insert Column
        </MenuOption>
        <MenuOption name="deleteRow" onClick={this.updateTable}>
          Delete Row
        </MenuOption>
        <MenuOption name="deleteColumn" onClick={this.updateTable} lastOption>
          Delete Column
        </MenuOption>
      </MenuWrapper>
    );
  }
}

const MenuWrapper = styled.div(
  { cursor: 'pointer', left: -105, position: 'absolute', top: 16 },
  ({ theme: { constants, table } }) => ({
    border: constants.border.primary,
    backgroundColor: constants.color.background.primary,
    color: constants.color.text.primary,
    fontSize: constants.fontSize.small,
    borderRadius: constants.borderRadius.small,
    boxShadow: constants.boxShadow.primary,

    ...table.cellMenu.wrapper({ theme: constants }),
  })
);

const MenuOption = styled.div(
  {
    padding: 4,
    width: 100,
    textAlign: 'center',
  },
  ({ theme: { constants, table }, lastOption }) => ({
    borderBottom: lastOption ? '' : constants.border.primary,
    '&:hover': {
      backgroundColor: constants.color.highlight.secondary,
    },

    ...table.cellMenu.option({ theme: constants }),
  })
);

MenuDropdown.propTypes = {
  updateMenuPosition: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pmview: PropTypes.object.isRequired,
};
