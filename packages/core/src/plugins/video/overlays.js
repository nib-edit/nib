import React, { PureComponent } from "react";
import styled from "@emotion/styled";
import { LinkButton, Input, Overlay } from "nib-ui";
import Embed from "nib-embed";

import { videoPluginKey } from "./plugin";

class VideoOverlay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      url: ""
    };
    this.overlayWrapper = React.createRef();
  }

  updateUrl = evt => {
    this.setState({
      url: evt.target.value
    });
  };

  addEmbed = () => {
    const { url } = this.state;
    if (!url) return;
    Embed.getEmbeddableHTML(url).then(embedHtml => {
      if (!embedHtml || !embedHtml.length) return;
      const { view } = this.props;
      const { state, dispatch } = view;
      const {
        tr,
        selection: { $from, $to }
      } = state;
      const { embed } = state.schema.nodes;
      dispatch(
        state.tr.replaceRangeWith(
          $from.pos,
          $to.pos,
          embed.create({ html: embedHtml })
        )
      );
      view.focus();
      this.closeOverlay();
    });
  };

  handleKeyDown = evt => {
    if (evt.key === "Enter") {
      this.addLink();
    }
  };

  closeOverlay = () => {
    const { view } = this.props;
    const { state, dispatch } = view;
    dispatch(state.tr.setMeta("HIDE_VIDEO_OVERLAY", true));
  };

  render() {
    const { url } = this.state;
    const { editorWrapper, marker } = this.props;
    return (
      <Overlay
        closeOverlay={this.closeOverlay}
        editorWrapper={editorWrapper}
        marker={marker}
        render={() => (
          <LinkPopup ref={this.overlayWrapper}>
            <Input
              autoFocus
              placeholder="Url"
              onChange={this.updateUrl}
              onKeyPress={this.handleKeyDown}
              value={url}
            />
            <LinkButton onClick={this.addEmbed}>Add</LinkButton>
          </LinkPopup>
        )}
      />
    );
  }
}

export default [
  {
    elmClassName: "video_toolbar_component",
    condition: state => {
      const pluginState = videoPluginKey.getState(state);
      return pluginState && pluginState.videoOverlayVisible;
    },
    component: VideoOverlay
  }
];

const LinkPopup = styled.div`
  align-items: flex-end;
  border-radius: 4px;
  display: flex;
  padding: 4px;
  font-size: 14px;
`;
