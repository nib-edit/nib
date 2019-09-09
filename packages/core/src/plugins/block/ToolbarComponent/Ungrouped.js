import PropTypes from "prop-types";
import React, { Fragment } from "react";

import { ToolbarButton, Icon, Space } from "nib-ui";
import formatKeymap from "../../../utils/format-keymap";
import { KeymapInfo } from "../keymaps";

const Ungrouped = ({ options, selectedBlockType, onChange }) => (
  <>
    {options.map((opt, index) => {
      const isSelected = opt.value.blockType === selectedBlockType;
      return (
        <Fragment key={`block-btn-${opt.value.tag}`}>
          <ToolbarButton
            name={opt.value.blockType}
            onClick={evt => onChange(evt.currentTarget.name)}
            selected={isSelected}
            title={formatKeymap(KeymapInfo[opt.value.tag])}
          >
            <Icon name={opt.value.tag} selected={isSelected} />
          </ToolbarButton>
          {index < options.length - 1 && <Space />}
        </Fragment>
      );
    })}
  </>
);

Ungrouped.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.array.isRequired,
  selectedBlockType: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

Ungrouped.defaultProps = {
  selectedBlockType: undefined
};

export default Ungrouped;
