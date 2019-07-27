import React, { PureComponent } from "react";
import { ToolbarButton, Icon } from "nib-ui";

class ImageToolbarComponent extends PureComponent {
  showImageModal = () => {
    const { state, dispatch } = this.props.appParams.view;
    dispatch(state.tr.setMeta("SHOW_IMAGE_TOOLBAR", true));
  };

  render() {
    return (
      <ToolbarButton onClick={this.showImageModal} title="Image">
        <Icon name="Image" />
      </ToolbarButton>
    );
  }
}

export default ImageToolbarComponent;
