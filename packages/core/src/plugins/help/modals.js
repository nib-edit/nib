import React, { PureComponent, Fragment } from "react";
import styled from "@emotion/styled";
import { Icon, Modal } from "nib-ui";

import { AppContext } from "../../common/app-context";
import { getOS } from "../../common/utils/device";
import { getPluginList } from "../../common/editor-helpers/plugin";
import { helpPluginKey } from "./plugin";

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
    const { state, dispatch } = this.props.view;
    dispatch(state.tr.setMeta("HIDE_HELP_MODAL", true));
  };

  renderKeymapColumn = keymap => {
    return (
      <span>
        {keymap.map(({ key, label }) => (
          <Option key={`option-key-${key}`}>
            <span>{label}</span>
            <span>{formatKey(key)}</span>
          </Option>
        ))}
      </span>
    );
  };

  render() {
    const { plugins } = this.context.config;
    const pluginKeymaps = getKeymapInfo(plugins.options);

    const keyMaps = pluginKeymaps.reduce(
      (keys, keymap) => [...keys, ...keymap.keymaps],
      []
    );

    const keymapCount = Math.ceil(keyMaps.length / 2);
    const keymapCol1 = keyMaps.slice(0, keymapCount);
    const keymapCol2 = keyMaps.slice(keymapCount, keyMaps.length);

    return (
      <Modal
        title="Help"
        hideModal={this.hideHelpModal}
        render={() => (
          <OptionWrapper>
            <SubTitle>Keyboard Shortcuts</SubTitle>
            <ColumnWrapper style={{ display: "flex" }}>
              {this.renderKeymapColumn(keymapCol1)}
              {this.renderKeymapColumn(keymapCol2)}
            </ColumnWrapper>
          </OptionWrapper>
        )}
      />
    );
  }
}

const SubTitle = styled.div`
  font-size: 18px;
  padding: 0px 0px 10px 20px;
`;

const OptionWrapper = styled.div`
  height: 100%;
  overflow: scroll;
`;

const ColumnWrapper = styled.div`
  display: flex;
  > span {
    width: 48%;
  }
  > span:first-of-type {
    margin-right: 4%;
  }
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
