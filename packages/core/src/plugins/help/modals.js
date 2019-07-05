import React, {PureComponent, Fragment} from "react";
import styled from "@emotion/styled";
import {Icons, Modal} from "nib-ui";

import {AppContext} from "../../common/app-context";
import {getOS} from "../../common/utils/device";
import {getPluginList} from "../../common/editor-helpers/plugin";
import {helpPluginKey} from "./plugin";

const getKeymapInfo = plugins =>
  getPluginList(plugins)
    .filter(plugin => plugin.KeymapInfo)
    .map(plugin => ({
      name: plugin.name,
      keymaps: Object.values(plugin.KeymapInfo)
    }));

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

class HelpModal extends PureComponent {
  static contextType = AppContext;

  hideHelpModal = () => {
    const {state, dispatch} = this.props.view;
    dispatch(state.tr.setMeta("HIDE_HELP_MODAL", true));
  };

  render() {
    const {plugins} = this.context.config;
    const pluginKeymaps = getKeymapInfo(plugins.options);
    return (
      <Modal
        hideModal={this.hideHelpModal}
        render={() => (
          <Wrapper onClick={this.stopPropagation}>
            <Header>
              <Title>Help</Title>
              <StyledCross onClick={this.hideHelpModal} />
            </Header>
            <MainSection>
              <OptionWrapper>
                <SubTitle>Keyboard Shortcuts</SubTitle>
                {pluginKeymaps.map(({name, keymaps}) => (
                  <Fragment key={`plugin-keymap-${name}`}>
                    {keymaps.map(({key, label}) => (
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
  font-size: 16px;
  min-width: 372px;
  border-radius: 2px;
`;

const Header = styled.div`
  box-shadow: rgb(235, 236, 240) 0px 1px 0px;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-size: 20px;
`;

const SubTitle = styled.div`
  font-weight: bold;
  padding: 0px 24px 10px;
`;

const StyledCross = styled(Icons.Cross)`
  cursor: pointer;
`;

const MainSection = styled.div`
  padding: 20px 0;
`;

const OptionWrapper = styled.div`
  height: 256px;
  overflow: scroll;
`;

const Option = styled.div`
  padding: 4px 24px;
  display: flex;
  justify-content: space-between;
`;

export default [
  {
    condition: state => {
      const pluginState = helpPluginKey.getState(state);
      return pluginState && pluginState.helpVisible;
    },
    component: HelpModal
  }
];
