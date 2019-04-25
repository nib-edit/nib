import React, {PureComponent} from "react";
import {ToolbarButton, Icons} from "nib-ui";

import {formatKeymap} from "../../common/utils/key-format";
import {KeymapInfo} from "./keymaps";

class HelpToolbarComponent extends PureComponent {
  showHelpModal = () => {
    const {state, dispatch} = this.props.app_params.view;
    dispatch(state.tr.setMeta("SHOW_HELP_MODAL", true));
  };

  render() {
    return (
      <ToolbarButton
        onClick={this.showHelpModal}
        title={formatKeymap(KeymapInfo.help)}
      >
        <Icons.Question />
      </ToolbarButton>
    );
  }
}

export default HelpToolbarComponent;
