import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { ToolbarButton, Icon } from "nib-ui";

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
      <ToolbarButton onClick={this.showVideoOverlay} title="Video">
        <IconWrapper
          style={{ height: 20, width: 20 }}
          className="video_toolbar_component"
        >
          <Icon name="Video" />
        </IconWrapper>
      </ToolbarButton>
    );
  }
}

const IconWrapper = styled.span`
  height: 20px;
  width: 20px;
`;

export default VideoToolbarComponent;
