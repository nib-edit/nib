import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import styled from "@emotion/styled";
import { Popup, ToolbarButton, Icon } from "nib-ui";
import { findParentNode, findParentDomRef } from "prosemirror-utils";
import * as TableCommands from "prosemirror-tables";
import { ThemeProvider } from "emotion-theming";

const Commands = [
  {
    title: "Toggle Header",
    name: "toggleHeader",
    icon: "toggleHeader",
  },
  {
    title: "Delete",
    name: "deleteTable",
    icon: "trash",
  },
];

class TableMenuPopup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateTable = (evt) => {
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    const { state, dispatch } = pmview;
    const commandName = evt.currentTarget.name;
    if (commandName === "toggleHeader") {
      TableCommands.toggleHeader("row")(state, dispatch);
    } else {
      TableCommands[commandName](state, dispatch);
    }
    pmview.focus();
  };

  render() {
    const { editorWrapper, marker, theme } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Popup
          onEscKeyPress={() => {}}
          onClickOutsideEditor={() => {}}
          editorWrapper={editorWrapper}
          marker={marker}
          render={() => (
            <Wrapper onMouseDown={(evt) => evt.preventDefault()}>
              {Commands.map(({ title, name, icon }) => (
                <ToolbarButton
                  key={`table_menu_option-${name}`}
                  onClick={this.updateTable}
                  name={name}
                  title={title}
                >
                  <Icon name={icon} />
                </ToolbarButton>
              ))}
            </Wrapper>
          )}
        />
      </ThemeProvider>
    );
  }
}

TableMenuPopup.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pmstate: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  editorWrapper: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  marker: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object.isRequired,
};

export default {
  name: "table_menu",
  getMarker: (_, pmview) => {
    if (!pmview || !pmview.hasFocus()) return undefined;
    const { state, domAtPos } = pmview;
    const { selection, schema } = state;
    const { table } = schema.nodes;
    const tableWrapper = findParentDomRef(
      ({ type }) => type === table,
      domAtPos.bind(pmview)
    )(selection);
    return tableWrapper && tableWrapper.firstChild;
  },
  condition: (view) => {
    if (!view || !view.hasFocus()) return undefined;
    const { state } = view;
    const { schema, selection } = state;
    const { table } = schema.nodes;
    const tableNode = findParentNode(({ type }) => type === table)(selection);
    return !!tableNode;
  },
  component: TableMenuPopup,
};

const Wrapper = styled.div(
  {
    alignItems: "center",
    display: "flex",
  },
  ({ theme: { constants } }) => ({
    borderRadius: constants.borderRadius,
    fontSize: constants.fontSize.medium,
  })
);
