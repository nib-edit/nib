import React, { useRef } from "react";

import PopupHandler from "../PopupHandler";
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

  return (
    <StyledWrapper ref={editorWrapper}>
      {topToolbarPresent && <TopToolbar />}
      <InnerEditor {...props} />
      {/* todo: better name for handler */}
      <PopupHandler editorWrapper={editorWrapper} />
    </StyledWrapper>
  );
};

export default Wrapper;
