import React, { PureComponent } from "react";
import { MenuButton, Icons } from "nib-ui";

import { linkPluginKey } from "./plugins";

class LinkMenu extends PureComponent {
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
      <MenuButton
        name="link"
        onClick={this.showLinkToolbar}
        disabled={this.isLinkMarkActive()}
      >
        <Icons.Link />
      </MenuButton>
    );
  }
}

export default LinkMenu;
