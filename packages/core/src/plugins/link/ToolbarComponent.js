import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { ToolbarButton, Icon } from "nib-ui";

import formatKeymap from "../../utils/format-keymap";
import { KeymapInfo } from "./keymaps";
import { PMStateConsumer } from "../../context/pm-state";
import { linkPluginKey } from "./plugin";

class ToolbarComponent extends PureComponent {
  showLinkToolbar = () => {
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    if (!pmview) return;
    if (!pmview.hasFocus) pmview.focus();

    const { state, dispatch } = pmview;
    dispatch(state.tr.setMeta("show-add-link-toolbar", true));
  };

  isLinkMarkActive = () => {
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    if (!pmview) return undefined;
    const { state } = pmview;
    const pluginState = linkPluginKey.getState(state);
    return pluginState && !!pluginState.link;
  };

  render() {
    return (
      <span className="nib-link-marker">
        <ToolbarButton
          name="link"
          onClick={this.showLinkToolbar}
          disabled={this.isLinkMarkActive()}
          title={formatKeymap(KeymapInfo.link)}
        >
          <Icon name="link" />
        </ToolbarButton>
      </span>
    );
  }
}

ToolbarComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pmstate: PropTypes.object.isRequired
};

export default props => (
  <PMStateConsumer>
    {pmstate => <ToolbarComponent pmstate={pmstate} {...props} />}
  </PMStateConsumer>
);
