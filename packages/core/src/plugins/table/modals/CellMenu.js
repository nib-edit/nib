import React, {Component} from "react";
import styled from "@emotion/styled";

import {Icons} from "nib-ui";

import {AppStateWrapper} from "../../../common/app-state";
import MenuDropdown from "./CellMenuDropdown";

class CellMenu extends Component {
  state = {
    menuPosition: {left: 0, top: 0},
    menuVisible: false
  };

  componentDidMount = () => {
    this.updateStatePosition();
  };

  componentDidUpdate = prevProps => {
    if (prevProps.marker !== this.props.marker) this.updateStatePosition();
  };

  updateStatePosition = () => {
    const {editorWrapper, marker} = this.props;
    const {
      top: wrapperTop,
      left: wrapperLeft
    } = editorWrapper.current.getBoundingClientRect();
    const {top, left, width} = marker.getBoundingClientRect();
    this.setState({
      top: top - wrapperTop,
      left: left + width - wrapperLeft - 20,
      menuVisible: false
    });
  };

  toggleMenuVisible = () => {
    this.setState({menuVisible: !this.state.menuVisible});
  };

  render() {
    if (!this.props.marker) return;
    const {top, left, menuVisible} = this.state;
    return (
      <AppStateWrapper
        render={() => (
          <Wrapper onMouseDown={e => e.preventDefault()} style={{top, left}}>
            <StyledArrowDownIcon onClick={this.toggleMenuVisible} />
            {menuVisible && (
              <MenuDropdown
                view={this.props.view}
                updateMenuPosition={this.updateStatePosition}
              />
            )}
          </Wrapper>
        )}
      />
    );
  }
}

const Wrapper = styled.div`
  position: absolute;
`;

const StyledArrowDownIcon = styled(Icons.ArrowDown)`
  fill: ${({theme}) => theme.table.cell.menuIcon.color};
  height: ${({theme}) => theme.table.cell.menuIcon.height}px;
  width: ${({theme}) => theme.table.cell.menuIcon.width}px;
  &: hover {
    ${({theme}) => theme.table.cell.menuIcon["&:hover"]};
  }
`;

export default {
  elmClassName: "nib-table-cell-marker",
  component: CellMenu
};
