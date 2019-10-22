import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "@emotion/styled";

import { Icon } from "nib-ui";

import MenuDropdown from "./CellMenuDropdown";
import { PMStateConsumer } from "../../../context/pm-state";

class CellMenu extends Component {
  state = {
    menuVisible: false
  };

  componentDidMount = () => {
    this.updateStatePosition();
  };

  componentDidUpdate = prevProps => {
    const { marker } = this.props;
    if (prevProps.marker !== marker) this.updateStatePosition();
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
    const { menuVisible } = this.state;
    this.setState({ menuVisible: !menuVisible });
  };

  render() {
    const { marker, pmstate } = this.props;
    if (!marker) return null;
    const { pmview } = pmstate;
    const { top, left, menuVisible } = this.state;
    return (
      <Wrapper style={{ top, left }} onMouseDown={evt => evt.preventDefault()}>
        <StyledIcon name="arrowDown" onClick={this.toggleMenuVisible} />
        {menuVisible && (
          <MenuDropdown
            pmview={pmview}
            updateMenuPosition={this.updateStatePosition}
          />
        )}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div({ position: "absolute" });

const StyledIcon = styled(Icon)(
  {
    height: 20,
    width: 20
  },
  ({ theme: { constants, table } }) => ({
    fill: constants.color.text.secondary,
    "&:hover": {
      fill: constants.color.highlight.primary
    },
    ...table.cellMenu.icon({ theme: constants })
  })
);

CellMenu.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  editorWrapper: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  marker: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pmstate: PropTypes.object.isRequired
};

export default {
  name: "cell_menu",
  getMarker: () => document.getElementsByClassName("nib-table-cell-marker")[0],
  component: props => (
    <PMStateConsumer>
      {pmstate => <CellMenu pmstate={pmstate} {...props} />}
    </PMStateConsumer>
  )
};
