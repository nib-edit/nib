import React, { PureComponent } from "react";
import styled from "@emotion/styled";

import { ConfigContext } from "../../common/config";
import { imagePluginKey } from "./plugins";

class UploadImage extends PureComponent {
  static contextType = ConfigContext;

  handleImageInputChangeinsertImage = event => {
    const { files } = event.target;
    insertImage(files[0]);
  };

  insertImage = file => {
    const { uploadCallback } = this.context.config.plugins.image;
    uploadCallback(file)
      .then(({ link }) => {
        if (!link) return;
        const { state, dispatch } = this.props.view;
        const { $from, $to } = state.selection;
        const { image } = state.schema.nodes;
        dispatch(
          state.tr.replaceRangeWith(
            $from.pos,
            $to.pos,
            image.create({ src: link })
          )
        );
      })
      .finally(() => {
        this.hideImageOverlay();
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

  hideImageOverlay = () => {
    const { state, dispatch } = this.props.view;
    dispatch(state.tr.setMeta("SHOW_IMAGE_TOOLBAR", false));
  };

  render() {
    return (
      <Root onClick={this.hideImageOverlay}>
        <Wrapper onClick={evt => evt.stopPropagation()}>
          <UploadSection
            onDragEnter={this.stopDefault}
            onDragOver={this.stopDefault}
            onDrop={this.onImageDrop}
          >
            <span>Drag and Drop the Image</span>
            <span>or</span>
            <ButtonLabel htmlFor="file">Click to Upload</ButtonLabel>
            <FileUploadInput
              type="file"
              id="file"
              onChange={this.handleImageInputChange}
            />
          </UploadSection>
        </Wrapper>
      </Root>
    );
  }
}

const Root = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
`;

const Wrapper = styled.div`
  background-color: white;
  border-radius: 2px;
  height: 30%;
  min-height: 200px;
  min-width: 500px;
  width: 50%;
`;

const ButtonLabel = styled.label`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;

  background-color: ${({ theme }) => theme.button.primary.backgroundColor};
  color: ${({ theme }) => theme.button.primary.color};

  border: ${({ theme }) => theme.button.primary.border};
  border-radius: ${({ theme }) => theme.button.primary.borderRadius};
  height: ${({ theme }) => theme.button.primary.height};
  width: ${({ theme }) => theme.button.primary.width};
  margin: ${({ theme }) => theme.button.primary.margin};
  padding: ${({ theme }) => theme.button.primary.padding};

  font-size: ${({ theme }) => theme.button.primary.fontSize};

  :hover {
    ${({ disabled, theme }) =>
      !disabled ? theme.button.primary["&:hover"] : ""};
  }
  ${({ selected, theme }) => selected && theme.button.primary["&:selected"]};
  ${({ disabled, theme }) => disabled && theme.button.primary["&:disabled"]};
`;

const UploadSection = styled.div`
  align-items: center;
  background: #eaeaea;
  border: 1px dashed #535353;
  display: flex;
  flex-direction: column;
  height: 100%;
  height: calc(100% - 40px);
  justify-content: center;
  margin: 20px;
  > span {
    margin-bottom: 10px;
  }
`;

const FileUploadInput = styled.input`
  display: none;
`;

export default [
  {
    condition: state => {
      const pluginState = imagePluginKey.getState(state);
      return pluginState && pluginState.showImageToolbar;
    },
    component: UploadImage
  }
];

/**
 * Extract an overlay component out to UI module, it should close on esc and click outside.
 */
