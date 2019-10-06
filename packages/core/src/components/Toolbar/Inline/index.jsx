import PropTypes from "prop-types";
import React, { Fragment } from "react";
import styled from "@emotion/styled";
import { Popup, Separator } from "nib-ui";

import { usePMStateContext } from "../../../context/pm-state";
import getToolbarComponents from "../../../utils/editor/toolbar";
import { useConfigContext } from "../../../context/config";

const Inline = ({ editorWrapper, marker }) => {
  if (!marker) return null;

  const {
    config: { plugins, toolbar }
  } = useConfigContext();
  const pmstate = usePMStateContext();
  const options = getToolbarComponents(plugins.options, toolbar.inline.options);

  const closePopup = () => {
    const { state, dispatch } = pmstate.pmview;
    // todo: here use a specific transaction for inline toolbar
    dispatch(state.tr.setMeta("hide-all-popups", true));
  };

  return (
    <StyledPopup
      onEscKeyPress={closePopup}
      onClickOutsideEditor={closePopup}
      editorWrapper={editorWrapper}
      marker={marker}
      render={() => (
        <Wrapper onMouseDown={e => e.preventDefault()}>
          {options.map((Option, index) => (
            <Fragment key={`inline-toolbar-option-${Option.name}`}>
              <Option.toolbarComponent config={toolbar.inline[Option.name]} />
              {index < options.length - 1 && <Separator />}
            </Fragment>
          ))}
        </Wrapper>
      )}
    />
  );
};

Inline.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  marker: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  editorWrapper: PropTypes.object.isRequired
};

const Wrapper = styled.div(
  {
    alignItems: "center",
    display: "flex",
    position: "relative",
    border: "none",
    userSelect: "none"
  },
  ({ theme: { constants, toolbar } }) => ({
    backgroundColor: constants.color.background,
    color: constants.color.text,
    fontSize: constants.fontSize.medium,
    borderRadius: constants.borderRadius.large,

    ...toolbar.top({ theme: constants })
  })
);

const StyledPopup = styled(Popup)({ padding: "2px !important" });

export default {
  name: "toolbar",
  getMarker: () =>
    document.getElementsByClassName("nib-selection-focus-marker")[0],
  component: Inline
};
