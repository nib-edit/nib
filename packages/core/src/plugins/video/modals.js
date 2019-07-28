import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import styled from "@emotion/styled";

import { Modal, Input, PrimaryButton, Space, SpaceSize } from "nib-ui";
import Embed from "nib-embed";

import { ConfigContext } from "../../context/config";

class VideoModal extends PureComponent {
  static contextType = ConfigContext;

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

  updateVideoSrc = videoSrc => {
    this.setState({ videoSrc });
  };

  insertVideo = () => {
    const { videoSrc } = this.state;
    if (!videoSrc) return;
    const { hideModal, pmstate } = this.props;
    const { pmview } = pmstate;
    const { state, dispatch } = pmview;
    const { tr, selection } = state;
    const { $from, $to } = selection;
    const { embed } = state.schema.nodes;
    dispatch(
      tr.replaceRangeWith($from.pos, $to.pos, embed.create({ html: videoSrc }))
    );
    pmview.focus();
    hideModal();
  };

  render() {
    const { hideModal } = this.props;
    const { videoSrc } = this.state;
    return (
      <Modal
        hideModal={hideModal}
        title="Video"
        render={() => (
          <Wrapper>
            <SubTitle>Enter url or upload</SubTitle>
            <InnerWrapper>
              <StyledInput
                placeholder="Url"
                autoFocus
                onChange={evt => this.addEmbed(evt.target.value)}
              />
              <VideoWrapper
                videoSrc={videoSrc}
                dangerouslySetInnerHTML={{ __html: videoSrc }}
              />
              <ButtonSection>
                <PrimaryButton onClick={this.insertVideo}>Insert</PrimaryButton>
                <Space size={SpaceSize.xl} />
                <PrimaryButton onClick={hideModal}>Cancel</PrimaryButton>
              </ButtonSection>
            </InnerWrapper>
          </Wrapper>
        )}
      />
    );
  }
}

VideoModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pmstate: PropTypes.object.isRequired
};

const Wrapper = styled.div({ padding: "0px 24px 10px" });

const InnerWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
});

const SubTitle = styled.div({}, ({ theme: { constants } }) => ({
  fontSize: constants.fontSize.large
}));

const StyledInput = styled(Input)({}, () => ({
  width: "75%",
  maxWidth: 400,
  "> input": { width: "100%", margin: "0 auto" }
}));

const ButtonSection = styled.div({
  display: "flex",
  marginTop: 20
});

const VideoWrapper = styled.span(
  {
    height: 280,
    width: "100%",
    maxWidth: 500,
    marginTop: 20,
    padding: 20,
    "> iframe": {
      width: "100%",
      height: 280
    }
  },
  ({ theme: { constants }, videoSrc }) => ({
    border: videoSrc
      ? `1px dashed ${constants.color.highlight}`
      : `1px dashed ${constants.color.highlight.text}`
  })
);

export default VideoModal;
