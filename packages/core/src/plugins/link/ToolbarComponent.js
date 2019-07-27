import React, { PureComponent } from "react";
import { ToolbarButton, Icon } from "nib-ui";

import styled from "@emotion/styled";
import { formatKeymap } from "../../common/utils/key-format";
import { KeymapInfo } from "./keymaps";
import { linkPluginKey } from "./plugin";

class LinkToolbarComponent extends PureComponent {
  showLinkToolbar = () => {
    const { view = {} } = this.props.appParams;
    const { state, dispatch } = view;
    if (!view.hasFocus) view.focus();
    dispatch(state.tr.setMeta("SHOW_LINK_TOOLBAR", true));
  };

  isLinkMarkActive = () => {
    const { view: { state } = {} } = this.props.appParams;
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
        <IconWrapper className="nib-link-marker">
          <Icon name="Link" />
        </IconWrapper>
      </ToolbarButton>
    );
  }
}

const IconWrapper = styled.span`
  height: 20px;
  width: 20px;
`;

export default LinkToolbarComponent;
