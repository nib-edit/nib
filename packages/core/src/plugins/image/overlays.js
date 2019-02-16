import React, { PureComponent } from "react";
import styled from "@emotion/styled";
import { Spinner } from "nib-ui";

import { ConfigContext } from "../../common/config";
import { imagePluginKey } from "./plugins";

class UploadImage extends PureComponent {
  static contextType = ConfigContext;

  state = { uploading: false };

  handleImageInputChange = event => {
    const { files } = event.target;
    this.insertImage(files[0]);
  };

  insertImage = file => {
    this.setState({ uploading: true });
    const { uploadCallback } = this.context.config.plugins.image;
    uploadCallback(file)
      .then(({ link }) => {
        this.setState({ uploading: false });
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

  stopPropagation = evt => evt.stopPropagation();

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
    const { uploading } = this.state;
    return (
      <Root onClick={this.hideImageOverlay}>
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
  box-shadow: "rgba(158, 158, 158, 0.75) 0px 4px 8px - 2px, rgba(158, 158, 158, 0.75) 0px 0px 1px";
  height: 30%;
  min-height: 250px;
  min-width: 300px;
  width: 30%;
`;

const UploadSection = styled.div`
  align-items: center;
  background: #eaeaea;
  border: 1px dashed
    ${({ uploading }) => (uploading ? "rgb(6, 95, 212)" : "#535353")};
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

const UploadLabel = styled.span`
  margin-top: 50px;
  text-align: center;
`;

const FileUploadInput = styled.input`
  display: none;
`;

const StyledSpinner = styled(Spinner)`
  margin-top: 10px;
  visibility: ${({ uploading }) => (uploading ? "visible" : "hidden")};
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
 * Todo: Extract an overlay component out to UI module, it should close on esc and click outside.
 * Todo: Make styles for image uploader and spinner configurable.
 */
