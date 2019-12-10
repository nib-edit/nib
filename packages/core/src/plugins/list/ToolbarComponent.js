import PropTypes from "prop-types";
import React, { PureComponent } from "react";

import { ToolbarButton, Icon, Space } from "nib-ui";

import formatKeymap from "../../utils/format-keymap";
import { PMStateConsumer } from "../../context/pm-state";
import { KeymapInfo } from "./keymaps";
import { listPluginKey } from "./plugin";
import { toggleListCmd } from "./commands";

class ToolbarComponent extends PureComponent {
  toggleList = evt => {
    const listType = evt.currentTarget.getAttribute("name");
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    const { state, dispatch } = pmview;
    toggleListCmd(listType, pmview)(state, dispatch);
  };

  getSelectedListType = () => {
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    if (!pmview) return undefined;
    const { state } = pmview;
    const pluginState = listPluginKey.getState(state);
    const selectedListType = pluginState && pluginState.selectedListType;
    return selectedListType && selectedListType.name;
  };

  render() {
    const selectedListType = this.getSelectedListType();
    const bulletListActive = selectedListType === "bulletList";
    const orderedListActive = selectedListType === "orderedList";

    return (
      <>
        <ToolbarButton
          name="bulletList"
          onClick={this.toggleList}
          selected={bulletListActive}
          title={formatKeymap(KeymapInfo.bulletList)}
        >
          <Icon name="listBulleted" selected={bulletListActive} />
        </ToolbarButton>
        <ToolbarButton
          name="orderedList"
          onClick={this.toggleList}
          selected={orderedListActive}
          title={formatKeymap(KeymapInfo.orderedList)}
        >
          <Icon name="listNumbered" selected={orderedListActive} />
        </ToolbarButton>
      </>
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
