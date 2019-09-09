import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "@emotion/styled";
import * as TableCommands from "prosemirror-tables";

export default class MenuDropdown extends Component {
  updateTable = evt => {
    const cmd = evt.target.getAttribute("name");
    const { pmview, updateMenuPosition } = this.props;
    const { state, dispatch } = pmview;
    TableCommands[cmd](state, dispatch);
    updateMenuPosition();
  };

  render() {
    return (
      <MenuWrapper>
        <MenuOption name="addRowBefore" onClick={this.updateTable}>
          Add Row Before
        </MenuOption>
        <MenuOption name="addRowAfter" onClick={this.updateTable}>
          Add Row After
        </MenuOption>
        <MenuOption name="addColumnBefore" onClick={this.updateTable}>
          Add Column Before
        </MenuOption>
        <MenuOption name="addColumnAfter" onClick={this.updateTable}>
          Add Column After
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
  { cursor: "pointer", left: -155, position: "absolute", top: 16 },
  ({ theme: { constants, table } }) => ({
    border: constants.border.medium,
    backgroundColor: constants.color.background,
    color: constants.color.text,
    fontSize: constants.fontSize.small,
    borderRadius: constants.borderRadius.small,
    boxShadow: constants.boxShadow.medium,
    ...table.cellMenu.wrapper({ theme: constants })
  })
);

const MenuOption = styled.div(
  {
    padding: 4,
    width: 150,
    textAlign: "center"
  },
  ({ theme: { constants, table }, lastOption }) => ({
    borderBottom: lastOption ? "" : constants.border.medium,
    "&:hover": {
      backgroundColor: constants.color.lightHighlight
    },

    ...table.cellMenu.option({ theme: constants })
  })
);

MenuDropdown.propTypes = {
  updateMenuPosition: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pmview: PropTypes.object.isRequired
};
