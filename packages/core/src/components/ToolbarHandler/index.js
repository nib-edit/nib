import PropTypes from "prop-types";
import React from "react";

import { usePMStateContext } from "../../context/pm-state";

const ToolbarHandler = ({ editorWrapper, plugins }) => {
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
  plugins: PropTypes.array.isRequired
};

export default ToolbarHandler;
