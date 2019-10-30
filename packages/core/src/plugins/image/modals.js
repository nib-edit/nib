import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import styled from "@emotion/styled";

import { Spinner, Modal, Input, PrimaryButton, Space, SpaceSize } from "nib-ui";
import NibUpload from "nib-upload";

import { ConfigContextConsumer } from "../../context/config";

class ImageModal extends PureComponent {
  state = { uploading: false, imageSrc: "", srcRequiredError: false };

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
      srcRequiredError: srcRequiredError && !imageSrc
    });
  };

  insertImage = file => {
    const { config, licenseKey } = this.props;
    this.setState({ uploading: true });
    const uploadFn =
      (config.plugins &&
        config.plugins.image &&
        config.plugins.image.uploadCallback) ||
      (licenseKey && NibUpload.uploadImage);
    if (uploadFn)
      uploadFn(file, licenseKey)
        .then(({ src }) => {
          if (!src) this.updateImageSrc("");
          else this.updateImageSrc(src);
        })
        .catch(() => {
          this.updateImageSrc("");
        })
        .finally(() => {
          this.setState({ uploading: false });
        });
  };

  // Check if property name is files or items
  // IE uses 'files' instead of 'items'
  onImageDrop = evt => {
    this.stopDefault(evt);
    const { items, files } = evt.dataTransfer;
    const data = items || files;
    const dataIsItems = !!items;
    for (let i = 0; i < data.length; i += 1) {
      if (
        (!dataIsItems || data[i].kind === "file") &&
        data[i].type.match("^image/")
      ) {
        const file = dataIsItems ? data[i].getAsFile() : data[i];
        this.insertImage(file);
      }
    }
  };

  handleImageInputChange = event => {
    const { files } = event.target;
    this.insertImage(files[0]);
  };

  stopDefault = evt => {
    evt.preventDefault();
    evt.stopPropagation();
  };

  render() {
    const { hideModal } = this.props;
    const { uploading, imageSrc, srcRequiredError } = this.state;
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
              <StyledLabel htmlFor="fileInput">
                <FileUploadInput
                  type="file"
                  id="fileInput"
                  onChange={this.handleImageInputChange}
                />
                <UploadSection
                  onDragEnter={this.stopDefault}
                  onDragOver={this.stopDefault}
                  onDrop={this.onImageDrop}
                  uploading={uploading}
                  src={imageSrc}
                >
                  {imageSrc && (
                    <ImageWrapper>
                      <StyledImage src={imageSrc} alt="uploaded_image" />
                    </ImageWrapper>
                  )}
                  <UploadLabel imageSrc={imageSrc}>
                    Drag and Drop the Image
                    <br />
                    or
                    <br />
                    Click to Upload
                  </UploadLabel>
                  {uploading && <StyledSpinner uploading={uploading} />}
                </UploadSection>
              </StyledLabel>
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
  pmstate: PropTypes.object.isRequired
};

ImageModal.defaultProps = {
  licenseKey: undefined
};

const Wrapper = styled.div({}, () => ({
  padding: "0px 24px 10px",
  height: "100%"
}));

const InnerWrapper = styled.div({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  height: "95%"
});

const SubTitle = styled.div({}, ({ theme: { constants } }) => ({
  fontSize: constants.fontSize.large
}));

const UploadSection = styled.span(
  {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    position: "relative",

    height: "75%",
    width: "35%",
    minWidth: 200,
    margin: "28px auto 0 auto",
    padding: 20,

    backgroundRepeat: "no-repeat",
    backgroundSize: "contain"
  },
  ({ theme, uploading, src }) => ({
    border:
      uploading || src
        ? `1px dashed ${theme.constants.color.highlight.primary}`
        : `1px dashed ${theme.constants.color.border.primary}`
  })
);

const UploadLabel = styled.span(
  { marginTop: 20, textAlign: "center", zIndex: 1, marginBottom: 10 },
  ({ theme: { constants }, imageSrc }) => ({
    color: imageSrc ? constants.color.background : constants.color.text.primary
  })
);

const StyledInput = styled(Input)({}, () => ({
  width: "75%",
  maxWidth: 400,
  "> input": { width: "100%", margin: "0 auto" }
}));

const StyledLabel = styled.label({}, () => ({ height: "75%", width: "100%" }));

const FileUploadInput = styled.input({ display: "none" });

const StyledSpinner = styled(Spinner)(
  {
    zIndex: 1,
    marginTop: 10
  },
  uploading => ({ visibility: uploading ? "visible" : "hidden" })
);

const ButtonSection = styled.div({ display: "flex", marginTop: 20 });

const ImageWrapper = styled.span({
  margin: 20,
  position: "absolute",

  top: 0,
  left: 0,
  height: "calc(100% - 40px)",
  width: "calc(100% - 40px)",

  display: "flex",
  justifyContent: "center",
  alignItems: "center"
});

const StyledImage = styled.img({
  height: "auto",
  width: "auto",
  maxHeight: "100%",
  maxWidth: "100%"
});

export default props => (
  <ConfigContextConsumer>
    {({ config, licenseKey }) => (
      <ImageModal config={config} licenseKey={licenseKey} {...props} />
    )}
  </ConfigContextConsumer>
);
