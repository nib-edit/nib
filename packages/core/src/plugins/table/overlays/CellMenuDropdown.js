import React, {Component} from "react";
import styled from "@emotion/styled";
import * as TableCommands from "prosemirror-tables";

export default class MenuDropdown extends Component {
  updateTable = evt => {
    const cmd = evt.target.getAttribute("name");
    const {view, updateMenuPosition} = this.props;
    const {state, dispatch} = view;
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

const MenuWrapper = styled.div`
  border: ${({theme}) => theme.table.cell.menuWrapper.border};
  background: ${({theme}) => theme.table.cell.menuWrapper.backgroundColor};
  cursor: pointer;
  left: -155px;
  position: absolute;
  font-size: ${({theme}) => theme.table.cell.menuWrapper.fontSize};
  border-radius: ${({theme}) => theme.table.cell.menuWrapper.borderRadius};
  top: 16px;
  box-shadow: ${({theme}) => theme.table.cell.menuWrapper.boxShadow};
`;

const MenuOption = styled.div`
  border-bottom: ${({lastOption, theme}) =>
    lastOption ? "" : theme.table.cell.menuOption.borderBottom};
  padding: ${({theme}) => theme.table.cell.menuOption.padding};
  width: ${({theme}) => theme.table.cell.menuOption.width};
  text-align: center;
  &:hover {
    ${({theme}) => theme.table.cell.menuOption["&:hover"]};
  }
`;
