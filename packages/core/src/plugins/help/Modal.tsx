import * as React from "react";
import { FunctionComponent } from "react";
import styled from "@emotion/styled";

import { Space, SpaceSize, Modal } from "nib-ui";

import { useConfigContext } from "../../context/config";
import { EditorStyle } from "../../types/editor-style";
import { KeymapData } from "../../types/application";

import { formatKey, getKeymapInfo } from "./utils";
import { Addon } from "../../types/addon";

interface KeymapColumnProps {
  keymap: KeymapData[];
}

const KeymapColumn: FunctionComponent<KeymapColumnProps> = ({ keymap }) => (
  <Column>
    {keymap.map(({ key, label }) => (
      <Option key={`option-key-${key}`}>
        <span>{label}</span>
        <StyledKey>{formatKey(key)}</StyledKey>
      </Option>
    ))}
  </Column>
);

interface HelpModalProps {
  hideModal: any;
  addons: Addon[];
  className: string;
}

export default (props: HelpModalProps) => {
  const { hideModal, addons, className } = props;
  const {
    config: { plugins },
  } = useConfigContext();
  const pluginKeymaps = getKeymapInfo(plugins.options, addons);

  const keyMaps = pluginKeymaps.reduce((keys, keymap) => {
    if (keymap.keymaps) return [...keys, ...keymap.keymaps];
    return [...keys];
  }, [] as KeymapData[]);

  const keymapCount = Math.ceil(keyMaps.length / 2);
  const keymapCol1 = keyMaps.slice(0, keymapCount);
  const keymapCol2 = keyMaps.slice(keymapCount, keyMaps.length);

  return (
    <Modal
      title="Help"
      hideModal={hideModal}
      className={className}
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
};

const SubTitle = styled.div(
  { padding: "0px 0px 10px 20px" },
  ({ theme: { constants } }: { theme: EditorStyle }) => ({
    fontSize: constants.fontSize.large,
  })
);

const Option = styled.div({
  padding: "4px 24px",
  display: "flex",
  justifyContent: "space-between",
});

const StyledKey = styled.span({
  whiteSpace: "nowrap",
});

const OptionWrapper = styled.div({ height: "100%", overflow: "scroll" });

const ColumnWrapper = styled.div({
  display: "flex",
  "@media(max-width: 700px)": {
    flexDirection: "column",
  },
});

const Column = styled.span({
  width: "48%",
  "@media(max-width: 700px)": {
    width: "100%",
  },
});
