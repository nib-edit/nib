import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled from '@emotion/styled';

import { Modal, Input, PrimaryButton, Space, SpaceSize } from 'nib-ui';

import { ConfigContextConsumer } from '../../context/config';

class ImageModal extends PureComponent {
  state = { imageSrc: '', srcRequiredError: false };

  insertImageInEditor = () => {
    const { imageSrc: src } = this.state;
    if (!src) {
      this.setState({ srcRequiredError: true });
      return;
    }
    const { pmstate, hideModal } = this.props;
    const { pmview } = pmstate;
    const { state, dispatch } = pmview;
    const { $from, $to } = state.selection;
    const { image } = state.schema.nodes;
    dispatch(
      state.tr.replaceRangeWith($from.pos, $to.pos, image.create({ src }))
    );
    hideModal();
    pmview.focus();
  };

  updateImageSrc = imageSrc => {
    const { srcRequiredError } = this.state;
    this.setState({
      imageSrc,
      srcRequiredError: srcRequiredError && !imageSrc,
    });
  };

  render() {
    const { hideModal } = this.props;
    const { imageSrc, srcRequiredError } = this.state;
    return (
      <Modal
        hideModal={hideModal}
        title="Image"
        render={() => (
          <Wrapper>
            <SubTitle>Enter url or upload</SubTitle>
            <InnerWrapper>
              <StyledInput
                placeholder="Url"
                autoFocus
                value={imageSrc}
                onChange={evt => this.updateImageSrc(evt.target.value)}
                error={srcRequiredError}
              />
              <ImageWrapper>
                {imageSrc && (
                  <StyledImage src={imageSrc} alt="uploaded_image" />
                )}
              </ImageWrapper>
              <ButtonSection>
                <PrimaryButton onClick={this.insertImageInEditor}>
                  Insert
                </PrimaryButton>
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

ImageModal.propTypes = {
  licenseKey: PropTypes.string,
  hideModal: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  config: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pmstate: PropTypes.object.isRequired,
};

ImageModal.defaultProps = {
  licenseKey: undefined,
};

const Wrapper = styled.div({}, () => ({
  padding: '0px 24px 10px',
  height: '100%',
}));

const InnerWrapper = styled.div({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  height: '95%',
});

const SubTitle = styled.div({}, ({ theme: { constants } }) => ({
  fontSize: constants.fontSize.large,
}));

const ImageWrapper = styled.span(
  {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    position: 'relative',

    height: '55%',
    width: '35%',
    minWidth: 200,
    margin: '28px auto 0 auto',
    padding: 20,

    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
  },
  ({ theme, src }) => ({
    border: src
      ? `1px dashed ${theme.constants.color.highlight.primary}`
      : `1px dashed ${theme.constants.color.border.primary}`,
  })
);

const StyledInput = styled(Input)({}, () => ({
  width: '75%',
  maxWidth: 400,
  '> input': { width: '100%', margin: '0 auto' },
}));

const ButtonSection = styled.div({ display: 'flex', marginTop: 20 });

const StyledImage = styled.img({
  height: 'auto',
  width: 'auto',
  maxHeight: '100%',
  maxWidth: '100%',
});

export default props => (
  <ConfigContextConsumer>
    {({ config, licenseKey }) => (
      <ImageModal config={config} licenseKey={licenseKey} {...props} />
    )}
  </ConfigContextConsumer>
);
