import PropTypes from "prop-types";
import React from "react";
import { ThemeProvider } from "emotion-theming";

import { ToolbarButton, Icon } from "nib-ui";

import { tablePluginKey } from "./plugins";
import createTable from "./commands";

const ToolbarComponent = (props) => {
  const insertTable = () => {
    const { pmstate } = props;
    const { pmview } = pmstate;
    const { state, dispatch } = pmview;
    createTable(state, dispatch);
  };

  const { pmstate, theme } = props;
  const { pmview } = pmstate;

  if (pmview) {
    const { state } = pmview;
    const { isTablePresent } = tablePluginKey.getState(state);

    return (
      <ThemeProvider theme={theme}>
        <ToolbarButton name="table" onClick={insertTable} title="Table">
          <Icon name="table" selected={isTablePresent} />
        </ToolbarButton>
      </ThemeProvider>
    );
  }
  return null;
};

ToolbarComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pmstate: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object.isRequired,
};

export default ToolbarComponent;
