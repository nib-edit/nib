import React, { PureComponent } from "react";
import { ToolbarButton, Icons } from "nib-ui";

import { formatKeymap } from "../../common/utils/key-format";
import { KeymapInfo } from "./keymaps";
import { linkPluginKey } from "./plugin";

class LinkToolbarComponent extends PureComponent {
  showLinkToolbar = () => {
    const { view = {} } = this.props.app_params;
    const { state, dispatch } = view;
    if (!view.hasFocus) view.focus();
    dispatch(state.tr.setMeta("SHOW_LINK_TOOLBAR", true));
  };

  isLinkMarkActive = () => {
    const { view: { state } = {} } = this.props.app_params;
    if (!state) return;
    const pluginState = linkPluginKey.getState(state);
    return pluginState && !!pluginState.link;
  };

  render() {
    return (
      <ToolbarButton
        name="link"
        onClick={this.showLinkToolbar}
        disabled={this.isLinkMarkActive()}
        title={formatKeymap(KeymapInfo.link)}
      >
        <Icons.Link />
      </ToolbarButton>
    );
  }
}

export default LinkToolbarComponent;
