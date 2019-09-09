import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import styled from "@emotion/styled";

import { Space, SpaceSize, Modal } from "nib-ui";

import getOS from "../../utils/device";
import { ConfigContext, ConfigContextConsumer } from "../../context/config";
import Plugins from "./pluginList";
import { KeymapInfo } from "./keymaps";

const getPluginList = plugins =>
  plugins
    .trim()
    .split(" ")
    .filter(p => p !== "help")
    .map(key => Plugins[key]);

const getKeymapInfo = plugins => {
  const pluginList = getPluginList(plugins)
    .filter(plugin => plugin.KeymapInfo)
    .map(plugin => ({
      name: plugin.name,
      keymaps: Object.values(plugin.KeymapInfo)
    }));
  pluginList.push({
    name: "help",
    keymaps: Object.values(KeymapInfo)
  });
  return pluginList;
};

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

const KeymapColumn = ({ keymap }) => (
  <Column>
    {keymap.map(({ key, label }) => (
      <Option key={`option-key-${key}`}>
        <span>{label}</span>
        <StyledKey>{formatKey(key)}</StyledKey>
      </Option>
    ))}
  </Column>
);

KeymapColumn.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  keymap: PropTypes.array.isRequired
};

class HelpModal extends PureComponent {
  static contextType = ConfigContext;

  render() {
    const { config, hideModal } = this.props;
    const { plugins } = config;
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
        hideModal={hideModal}
        render={() => (
          <OptionWrapper>
            <SubTitle>Keyboard Shortcuts</SubTitle>
            <ColumnWrapper>
              <KeymapColumn keymap={keymapCol1} />
              <Space size={SpaceSize.m} />
              <KeymapColumn keymap={keymapCol2} />
            </ColumnWrapper>
          </OptionWrapper>
        )}
      />
    );
  }
}

HelpModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  config: PropTypes.object.isRequired
};

const SubTitle = styled.div(
  { padding: "0px 0px 10px 20px" },
  ({ theme: { constants } }) => ({
    fontSize: constants.fontSize.large
  })
);

const Option = styled.div({
  padding: "4px 24px",
  display: "flex",
  justifyContent: "space-between"
});

const StyledKey = styled.span({
  whiteSpace: "nowrap"
});

const OptionWrapper = styled.div({ height: "100%", overflow: "scroll" });

const ColumnWrapper = styled.div({
  display: "flex",
  "@media(max-width: 700px)": {
    flexDirection: "column"
  }
});

const Column = styled.span({
  width: "48%",
  "@media(max-width: 700px)": {
    width: "100%"
  }
});

export default props => (
  <ConfigContextConsumer>
    {({ config }) => <HelpModal config={config} {...props} />}
  </ConfigContextConsumer>
);
