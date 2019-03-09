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
              <StyledArrowDownIcon onClick={this.toggleMenuVisible} />
              {menuVisible && (
                <Menu
                  view={this.props.view}
                  updateMenuPosition={this.updateStatePosition}
                />
              )}
            </Wrapper>
          );
        }}
      />
    );
  }
}

const Wrapper = styled.div`
  position: absolute;
`;

const StyledArrowDownIcon = styled(Icons.ArrowDown)`
  fill: #9e9e9e;
  height: 20px;
  width: 20px;
  &:hover {
    fill: #212121;
  }
`;

class Menu extends Component {
  updateTable = evt => {
    const cmd = evt.target.getAttribute("name");
    const { view, updateMenuPosition } = this.props;
    const { state, dispatch } = view;
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
  border: 1px solid rgba(158, 158, 158, 0.75);
  background: white;
  cursor: pointer;
  left: -155px;
  position: absolute;
  font-size: 12px;
  border-radius: 2px;
  top: 16px;
  box-shadow: #cdcdcdbf 0px 2px 8px -2px, #cdcdcdbf 0px 0px 1px;
`;

const MenuOption = styled.div`
  border-bottom: ${({ lastOption }) =>
    lastOption ? "" : "1px solid rgba(158, 158, 158, 0.75)"};
  padding: 5px;
  width: 150px;
  text-align: center;
  &:hover {
    background-color: #e0e0e0;
  }
`;

export default {
  elmClassName: "nib-table-cell-marker",
  component: CellMenu
};

// todo: make styles customizeable
// todo: fix topbar icon colors
// todo: refactor and cleanup component
