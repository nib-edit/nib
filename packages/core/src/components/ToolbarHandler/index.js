import PropTypes from "prop-types";
import React from "react";
import { withTheme } from "emotion-theming";

import { usePMStateContext } from "../../context/pm-state";

const ToolbarHandler = ({ editorWrapper, plugins, theme }) => {
  const pmstate = usePMStateContext();
  return (
    <>
      {plugins.map(
        plugin =>
          plugin.toolbar &&
          plugin.toolbar.map((Toolbar, index) => (
            <Toolbar
              // eslint-disable-next-line react/no-array-index-key
              key={`plugin-toolbar-${plugin.name}-${index}`}
              editorWrapper={editorWrapper}
              pmstate={pmstate}
              theme={theme}
            />
          ))
      )}
    </>
  );
};

ToolbarHandler.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  editorWrapper: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  plugins: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object
};

ToolbarHandler.defaultProps = {
  theme: {}
};

export default withTheme(ToolbarHandler);
