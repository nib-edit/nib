import React, { PureComponent, Fragment } from "react";
import styled from "@emotion/styled";
import { Icons, Overlay } from "nib-ui";

import { ConfigContext } from "../../common/config";
import { getKeymapInfo } from "../../common/editor-helpers";
import { getOS } from "../../common/utils/device";
import { helpPluginKey } from "./plugin";

const formatKey = key => {
  const os = getOS();
  let mod = "⌘";
  if (os === "Windows") {
    mod = "^";
  }
  let formattedKey = key.replace("mod", mod);
  formattedKey = formattedKey.replace(/-/g, " + ");
  formattedKey = formattedKey.replace("shift", "⇧");
  formattedKey = formattedKey.replace("alt", "⌥");
  return formattedKey;
};

class HelpOverlay extends PureComponent {
  static contextType = ConfigContext;

  hideHelpOverlay = () => {
    const { state, dispatch } = this.props.view;
    dispatch(state.tr.setMeta("HIDE_HELP_OVERLAY", true));
  };

  render() {
    const { plugins } = this.context.config;
    const pluginKeymaps = getKeymapInfo(plugins.options);
    return (
      <Overlay
        hideOverlay={this.hideHelpOverlay}
        render={() => (
          <Wrapper onClick={this.stopPropagation}>
            <Header>
              <Title>KEYBOARD SHORTCUTS</Title>
              <StyledCross onClick={this.hideHelpOverlay} />
            </Header>
            <MainSection>
              <OptionWrapper>
                {pluginKeymaps.map(({ name, keymaps }) => (
                  <Fragment key={`plugin-keymap-${name}`}>
                    {keymaps.map(({ key, label }) => (
                      <Option key={`option-key-${key}`}>
                        <span>{label}</span>
                        <span>{formatKey(key)}</span>
                      </Option>
                    ))}
                  </Fragment>
                ))}
              </OptionWrapper>
            </MainSection>
          </Wrapper>
        )}
      />
    );
  }
}

const Wrapper = styled.div`
  background-color: white;
  color: #212121;
  font-size: 16px;
  min-width: 372px;
`;

const Header = styled.div`
  border-bottom: 1px solid rgba(158, 158, 158, 0.75);
  padding: 12px 24px;
  position: relative;
`;

const Title = styled.div`
  font-size: 20px;
  text-align: center;
  width: 100%;
`;

const StyledCross = styled(Icons.Cross)`
  cursor: pointer;
  position: absolute;
  right: -10px;
  top: -6px;
  background-color: #212121;
  fill: white;
  border-radius: 50%;
  height: 20px;
  width: 20px;
`;

const MainSection = styled.div`
  padding: 20px;
`;

const OptionWrapper = styled.div`
  height: 256px;
  overflow: scroll;
`;

const Option = styled.div`
  padding: 4px 16px;
  display: flex;
  justify-content: space-between;
`;

export default [
  {
    condition: state => {
      const pluginState = helpPluginKey.getState(state);
      return pluginState && pluginState.helpVisible;
    },
    component: HelpOverlay
  }
];

// todo: table cell menu to go away on editor blur.
