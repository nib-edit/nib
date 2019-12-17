import PropTypes from "prop-types";
import React, { useRef } from "react";

import PopupHandler from "../PopupHandler";
import ToolbarHandler from "../ToolbarHandler";
import TopToolbar from "../Toolbar/Top";
import { useConfigContext } from "../../context/config";

import InnerEditor from "./editor";
import { StyledWrapper } from "./styles";

const Wrapper = props => {
  const editorWrapper = useRef(null);
  const {
    config: { toolbar }
  } = useConfigContext();

  const topToolbarPresent = toolbar.options.indexOf("top") >= 0;
  const { addons } = props;
  return (
    <StyledWrapper ref={editorWrapper}>
      {topToolbarPresent && <TopToolbar editorWrapper={editorWrapper} />}
      <InnerEditor {...props} />
      {/* todo: better name for handler */}
      <PopupHandler editorWrapper={editorWrapper} />
      {/* currently ToolbarHandler is used for addon toolbars only but its use can be extended */}
      {addons && (
        <ToolbarHandler editorWrapper={editorWrapper} plugins={addons} />
      )}
    </StyledWrapper>
  );
};

Wrapper.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  addons: PropTypes.array
};

Wrapper.defaultProps = {
  addons: undefined
};

export default Wrapper;
