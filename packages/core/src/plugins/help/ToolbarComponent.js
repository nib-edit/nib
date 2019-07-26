import React, { PureComponent } from "react";
import { ToolbarButton, Icon } from "nib-ui";

import styled from "@emotion/styled";
import { formatKeymap } from "../../common/utils/key-format";
import { KeymapInfo } from "./keymaps";

class HelpToolbarComponent extends PureComponent {
  showHelpModal = () => {
    const { state, dispatch } = this.props.appParams.view;
    dispatch(state.tr.setMeta("SHOW_HELP_MODAL", true));
  };

  render() {
    const { className } = this.props;
    return (
      <StyledButton
        className={className}
        onClick={this.showHelpModal}
        title={formatKeymap(KeymapInfo.help)}
      >
        <Icon name="Question" />
      </StyledButton>
    );
  }
}

const StyledButton = styled(ToolbarButton)`
  margin-left: 8px;
`;

export default HelpToolbarComponent;
