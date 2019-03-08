import React, { Component } from "react";
import styled from "@emotion/styled";
import * as TableCommands from "prosemirror-tables";

import { Icons } from "nib-ui";

import { AppStateWrapper } from "../../../common/app-state";

class CellMenu extends Component {
  state = {
    menuPosition: { left: 0, top: 0 },
    menuVisible: false
  };

  componentDidMount = () => {
    this.updateStatePosition();
  };

  componentDidUpdate = prevProps => {
    if (prevProps.marker !== this.props.marker) this.updateStatePosition();
  };

  updateStatePosition = () => {
    const { editorWrapper, marker } = this.props;
    const {
      top: wrapperTop,
      left: wrapperLeft
    } = editorWrapper.current.getBoundingClientRect();
    const { top, left, width } = marker.getBoundingClientRect();
    this.setState({
      top: top - wrapperTop,
      left: left + width - wrapperLeft - 20,
      menuVisible: false
    });
  };

  toggleMenuVisible = () => {
    this.setState({ menuVisible: !this.state.menuVisible });
  };

  render() {
    if (!this.props.marker) return;
    const { top, left, menuVisible } = this.state;
    return (
      <AppStateWrapper
        render={app_params => {
          return (
            <Wrapper
              onMouseDown={e => e.preventDefault()}
              style={{ top, left }}
            >
              <Icons.ArrowDown onClick={this.toggleMenuVisible} />
              {menuVisible && <Menu view={this.props.view} />}
            </Wrapper>
          );
        }}
      />
    );
  }
}

const Wrapper = styled.div`
  position: absolute;
  svg {
    height: 20px;
    width: 20px;
  }
`;

class Menu extends Component {
  updateTable = evt => {
    const cmd = evt.target.getAttribute("name");
    const { state, dispatch } = this.props.view;
    TableCommands[cmd](state, dispatch);
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
        <MenuOption name="deleteColumn" onClick={this.updateTable}>
          Delete Column
        </MenuOption>
      </MenuWrapper>
    );
  }
}

const MenuWrapper = styled.div`
  border: 1px solid rgba(158, 158, 158, 0.75);
  background: white;
  cursor: pointer;
  left: -142px;
  position: absolute;
  font-size: 14px;
  border-radius: 2px;
  top: 20px;
`;

const MenuOption = styled.div`
  border-bottom: 1px solid rgba(158, 158, 158, 0.75);
  padding: 5px;
  width: 150px;
`;

export default {
  elmClassName: "nib-table-cell-marker",
  component: CellMenu
};
