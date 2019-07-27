import React, { PureComponent } from "react";
import styled from "@emotion/styled";
import { Modal, Input, LinkButton } from "nib-ui";
import Embed from "nib-embed";

import { AppContext } from "../../common/app-context";
import { videoPluginKey } from "./plugin";

class InsertVideo extends PureComponent {
  static contextType = AppContext;

  state = { videoSrc: "" };

  addEmbed = url => {
    if (!url) this.updateVideoSrc("");
    Embed.getEmbeddableHTML(url).then(embedHtml => {
      if (!embedHtml || !embedHtml.length) {
        this.updateVideoSrc("");
        return;
      }
      this.updateVideoSrc(embedHtml);
    });
  };

  insertVideo = () => {
    const { view } = this.props;
    const { state, dispatch } = view;
    const {
      tr,
      selection: { $from, $to }
    } = state;
    const { videoSrc } = this.state;
    const { embed } = state.schema.nodes;
    dispatch(
      tr.replaceRangeWith($from.pos, $to.pos, embed.create({ html: videoSrc }))
    );
    view.focus();
    this.hideVideoModal();
  };

  updateVideoSrc = videoSrc => {
    this.setState({ videoSrc });
  };

  hideVideoModal = () => {
    const { state, dispatch } = this.props.view;
    dispatch(state.tr.setMeta("HIDE_VIDEO_OVERLAY", true));
  };

  render() {
    const { videoSrc } = this.state;
    return (
      <Modal
        hideModal={this.hideVideoModal}
        title="Video"
        render={() => (
          <Wrapper>
            <SubTitle>Enter url or upload</SubTitle>
            <ContentWrapper>
              <Input
                placeholder="Url"
                autoFocus
                onChange={evt => this.addEmbed(evt.target.value)}
              />
              <VideoWrapper
                videoSrc={videoSrc}
                dangerouslySetInnerHTML={{ __html: videoSrc }}
              />
              <ButtonSection>
                <LinkButton onClick={this.insertVideo}>Insert</LinkButton>
                <LinkButton onClick={this.hideVideoModal}>Cancel</LinkButton>
              </ButtonSection>
            </ContentWrapper>
          </Wrapper>
        )}
      />
    );
  }
}

const Wrapper = styled.div`
  padding: 0px 24px 10px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// todo: extract styles like these as re-usable styled
const SubTitle = styled.div`
  font-size: 18px;
`;

const ButtonSection = styled.div`
  display: flex;
  margin-top: 20px;
  > button:first-of-type {
    margin-right: 16px;
  }
`;

const VideoWrapper = styled.span`
  height: 280px;
  width: 500px;
  margin-top: 20px;
  padding: 20px;
  border: ${({ theme, videoSrc }) =>
    videoSrc
      ? `1px dashed ${theme.uploadModal.borderActiveColor}`
      : `1px dashed ${theme.uploadModal.borderColor}`};
  > iframe {
    width: 100%;
    height: 280px;
  }
`;

export default [
  {
    condition: state => {
      const pluginState = videoPluginKey.getState(state);
      return pluginState && pluginState.videoOverlayVisible;
      // return true;
    },
    component: InsertVideo
  }
];
