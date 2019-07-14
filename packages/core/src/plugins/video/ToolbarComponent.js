import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { ToolbarButton, Icons } from "nib-ui";

class VideoToolbarComponent extends PureComponent {
  static propTypes = {
    appParams: PropTypes.shape({
      view: PropTypes.object
    }).isRequired
  };

  showVideoOverlay = () => {
    const { appParams } = this.props;
    const { state, dispatch } = appParams.view;
    dispatch(state.tr.setMeta("SHOW_VIDEO_OVERLAY", true));
  };

  render() {
    return (
      <ToolbarButton
        className="video_toolbar_component"
        onClick={this.showVideoOverlay}
        title="Video"
      >
        <Icons.Video />
      </ToolbarButton>
    );
  }
}

export default VideoToolbarComponent;
