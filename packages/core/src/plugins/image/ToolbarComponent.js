import React, { PureComponent } from "react";
import { ToolbarButton, Icons } from "nib-ui";

class ImageToolbarComponent extends PureComponent {
  showImageOverlay = () => {
    const { view = {} } = this.props.app_params;
    const { state, dispatch } = view;
    dispatch(state.tr.setMeta("SHOW_IMAGE_TOOLBAR", true));
  };

  render() {
    return (
      <ToolbarButton name="image" onClick={this.showImageOverlay}>
        <Icons.Image />
      </ToolbarButton>
    );
  }
}

export default ImageToolbarComponent;
