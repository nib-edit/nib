import React, { PureComponent } from "react";
import styled from "@emotion/styled";
import { Spinner, Modal, Input, LinkButton } from "nib-ui";
import { uploadImage } from "nib-upload";

import { AppContext } from "../../common/app-context";
import { imagePluginKey } from "./plugin";

class UploadImage extends PureComponent {
  static contextType = AppContext;

  state = { uploading: false, imageSrc: "" };

  handleImageInputChange = event => {
    const { files } = event.target;
    this.insertImage(files[0]);
  };

  insertImageInEditor = () => {
    const { imageSrc: src } = this.state;
    if (!src) return;
    const { state, dispatch } = this.props.view;
    const { $from, $to } = state.selection;
    const { image } = state.schema.nodes;
    dispatch(
      state.tr.replaceRangeWith($from.pos, $to.pos, image.create({ src }))
    );
    this.hideImageModal();
    this.props.view.focus();
  };

  updateImageSrc = imageSrc => {
    this.setState({ imageSrc });
  };

  insertImage = file => {
    this.setState({ uploading: true });
    const { config, licenseKey } = this.context;
    const uploadFn =
      (config.plugins &&
        config.plugins.image &&
        config.plugins.image.uploadCallback) ||
      (licenseKey && uploadImage);
    if (uploadFn)
      uploadFn(file, licenseKey)
        .then(({ src }) => {
          this.setState({ uploading: false });
          if (!src) this.updateImageSrc("");
          else this.updateImageSrc(src);
        })
        .catch(() => {
          this.updateImageSrc("");
        });
  };

  stopDefault = evt => {
    evt.preventDefault();
    evt.stopPropagation();
  };

  // Check if property name is files or items, IE uses 'files' instead of 'items'
  onImageDrop = evt => {
    this.stopDefault(evt);
    const { items, files } = evt.dataTransfer;
    const data = items || files;
    const dataIsItems = !!items;
    for (let i = 0; i < data.length; i++) {
      if (
        (!dataIsItems || data[i].kind === "file") &&
        data[i].type.match("^image/")
      ) {
        const file = dataIsItems ? data[i].getAsFile() : data[i];
        this.insertImage(file);
      }
    }
  };

  hideImageModal = () => {
    const { state, dispatch } = this.props.view;
    dispatch(state.tr.setMeta("HIDE_IMAGE_TOOLBAR", true));
  };

  render() {
    const { uploading, imageSrc } = this.state;
    return (
      <Modal
        hideModal={this.hideImageModal}
        title="Image"
        render={() => (
          <Wrapper>
            <SubTitle>Enter url or upload</SubTitle>
            <ContentWrapper>
              <Input
                placeholder="Url"
                autoFocus
                value={imageSrc}
                onChange={evt => this.updateImageSrc(evt.target.value)}
              />
              <label htmlFor="file">
                <FileUploadInput
                  type="file"
                  id="file"
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
                      <StyledImage src={imageSrc} alt="uploaded" />
                    </ImageWrapper>
                  )}
                  <UploadLabel imageSrc={imageSrc}>
                    Drag and Drop the Image 
{' '}
<br />
{' '}
or
{' '}
<br />
{' '}
Click to Upload
</UploadLabel>
                  <StyledSpinner uploading={uploading} />
                </UploadSection>
              </label>
              <ButtonSection>
                <LinkButton onClick={this.insertImageInEditor}>
                  Insert
                </LinkButton>
                <LinkButton onClick={this.hideImageModal}>Cancel</LinkButton>
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

const UploadSection = styled.div`
  align-items: center;
  border: ${({ theme, uploading, src }) =>
    uploading || src
      ? `1px dashed ${theme.uploadModal.borderActiveColor}`
      : `1px dashed ${theme.uploadModal.borderColor}`};
  display: flex;
  flex-direction: column;
  height: 280px;
  width: 280px;
  margin-top: 28px;
  justify-content: center;
  position: relative;
  padding: 20px;
  background-repeat: no-repeat;
  background-size: contain;
`;

const UploadLabel = styled.span`
  margin-top: 50px;
  text-align: center;
  z-index: 1;
  margin-bottom: 10px;
  color: ${({ imageSrc }) => (imageSrc ? "white" : "#212121")};
`;

const FileUploadInput = styled.input`
  display: none;
`;

const StyledSpinner = styled(Spinner)`
  z-index: 1;
  margin-top: 10px;
  visibility: ${({ uploading }) => (uploading ? "visible" : "hidden")};
`;

const ButtonSection = styled.div`
  display: flex;
  margin-top: 48px;
  > button:first-of-type {
    margin-right: 16px;
  }
`;

const ImageWrapper = styled.span`
  position: absolute;
  top: 0px;
  left: 0px;
  height: calc(100% - 40px);
  width: calc(100% - 40px);
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  height: auto;
  width: 100%;
`;

export default [
  {
    condition: state => {
      const pluginState = imagePluginKey.getState(state);
      return pluginState && pluginState.imageToolbarVisible;
      // return true;
    },
    component: UploadImage
  }
];
