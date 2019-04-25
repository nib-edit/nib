import React, {PureComponent} from "react";
import styled from "@emotion/styled";
import {Spinner, Modal} from "nib-ui";

import {ConfigContext} from "../../common/config";
import {imagePluginKey} from "./plugin";

class UploadImage extends PureComponent {
  static contextType = ConfigContext;

  state = {uploading: false};

  handleImageInputChange = event => {
    const {files} = event.target;
    this.insertImage(files[0]);
  };

  insertImage = file => {
    this.setState({uploading: true});
    const {uploadCallback} = this.context.config.plugins.image;
    uploadCallback(file)
      .then(({link}) => {
        this.setState({uploading: false});
        if (!link) return;
        const {state, dispatch} = this.props.view;
        const {$from, $to} = state.selection;
        const {image} = state.schema.nodes;
        dispatch(
          state.tr.replaceRangeWith(
            $from.pos,
            $to.pos,
            image.create({src: link})
          )
        );
      })
      .finally(() => {
        this.hideImageModal();
      });
  };

  stopDefault = evt => {
    evt.preventDefault();
    evt.stopPropagation();
  };

  // Check if property name is files or items, IE uses 'files' instead of 'items'
  onImageDrop = evt => {
    this.stopDefault(evt);
    const {items, files} = evt.dataTransfer;
    let data = items || files;
    let dataIsItems = !!items;
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
    const {state, dispatch} = this.props.view;
    dispatch(state.tr.setMeta("HIDE_IMAGE_TOOLBAR", true));
  };

  render() {
    const {uploading} = this.state;
    return (
      <Modal
        hideModal={this.hideImageModal}
        render={() => (
          <Wrapper onClick={this.stopPropagation}>
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
              >
                <UploadLabel>
                  Drag and Drop the Image <br /> or <br /> Click to Upload
                </UploadLabel>
                <StyledSpinner uploading={uploading} />
              </UploadSection>
            </label>
          </Wrapper>
        )}
      />
    );
  }
}

const Wrapper = styled.div`
  background-color: white;
  min-height: 240px;
  min-width: 300px;
  padding: 20px;
`;

const UploadSection = styled.div`
  align-items: center;
  background: ${({theme}) => theme.imageUploadModal.backgroundColor};
  border: 1px dashed
    ${({theme, uploading}) =>
      uploading
        ? theme.imageUploadModal.backgroundColor.borderActiveColor
        : theme.imageUploadModal.backgroundColor.borderColor};
  display: flex;
  flex-direction: column;
  height: ${({theme}) => theme.imageUploadModal.height};
  justify-content: center;
  width: ${({theme}) => theme.imageUploadModal.width};
  > span {
    margin-bottom: 10px;
  }
`;

const UploadLabel = styled.span`
  margin-top: 50px;
  text-align: center;
`;

const FileUploadInput = styled.input`
  display: none;
`;

const StyledSpinner = styled(Spinner)`
  margin-top: 10px;
  visibility: ${({uploading}) => (uploading ? "visible" : "hidden")};
`;

export default [
  {
    condition: state => {
      const pluginState = imagePluginKey.getState(state);
      return pluginState && pluginState.imageToolbarVisible;
    },
    component: UploadImage
  }
];
