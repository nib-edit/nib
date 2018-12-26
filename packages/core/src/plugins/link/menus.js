import React, { PureComponent } from "react";
import { Button, Icons } from "nib-ui";

import { linkPluginKey } from "./plugins";

class LinkMenu extends PureComponent {
  showLinkToolbar = () => {
    const { view: { state: editorState, dispatch } = {} } = this.props;
    dispatch(editorState.tr.setMeta(linkPluginKey, "SHOW_LINK_TOOLBAR"));
  };

  isLinkMarkActive = () => {
    const { view: { state: editorState } = {} } = this.props;
    if (!editorState) return;
    const pluginState = linkPluginKey.getState(editorState);
    return pluginState && pluginState.linkMarkActive;
  };

  render() {
    const { view = {} } = this.props;
    const { state: editorState } = view;
    const pluginState = editorState && linkPluginKey.getState(editorState);
    const linkMarker = document.getElementsByClassName("nib-link-marker");
    return (
      <>
        <Button
          name="link"
          onClick={this.showLinkToolbar}
          selected={this.isLinkMarkActive()}
        >
          <Icons.Link />
        </Button>
      </>
    );
  }
}

export default [LinkMenu];
