import React, { PureComponent } from "react";
import styled from "@emotion/styled";

import { ConfigContext } from "../../common/config";
import { imagePluginKey } from "./plugins";

class UploadImage extends PureComponent {
  static contextType = ConfigContext;

  insertImage = event => {
    const { uploadCallback } = this.context.config.plugins.image;
    const { files } = event.target;
    if (files && files.length > 0) {
      uploadCallback(files[0])
        .then(({ data: { link } = {} }) => {
          if (!link) return;
          const { state, dispatch } = this.props.view;
          const { $from, $to } = state.selection;
          const { image } = state.schema.nodes;
          const { tr } = state;
          dispatch(
            tr.replaceRangeWith($from.pos, $to.pos, image.create({ src: link }))
          );
        })
        .finally(() => {
          this.hideImageOverlay();
        });
    }
  };

  hideImageOverlay = () => {
    const { state, dispatch } = this.props.view;
    dispatch(state.tr.setMeta("SHOW_IMAGE_TOOLBAR", false));
  };

  render() {
    return (
      <Wrapper>
        <UploadSection>
          <input type="file" id="file" onChange={this.insertImage} />
        </UploadSection>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
`;

const UploadSection = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 2px;
  display: flex;
  height: 100px;
  justify-content: center;
  width: 300px;
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
