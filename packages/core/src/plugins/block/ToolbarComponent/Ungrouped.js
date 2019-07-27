import React, { PureComponent, Fragment } from "react";

import { ToolbarButton, Icon, Separator } from "nib-ui";

import { KeymapInfo } from "../keymaps";
import { formatKeymap } from "../../../common/utils/key-format";

export default class Ungrouped extends PureComponent {
  handleChange = evt => {
    this.props.onChange(evt.currentTarget.name);
  };

  render() {
    const { options, selectedBlockType } = this.props;
    return (
      <>
        {options.map((opt, index) => {
          const isSelected = opt.value.tag === selectedBlockType;
          return (
            <Fragment key={`block-btn-${opt.value.tag}`}>
              <ToolbarButton
                name={opt.value.blockType}
                onClick={this.handleChange}
                selected={isSelected}
                title={formatKeymap(KeymapInfo[opt.value.tag])}
              >
                <Icon
                  name={opt.value.tag.toUpperCase()}
                  selected={isSelected}
                />
              </ToolbarButton>
              {index < options.length - 1 && <Separator type="toolbar" />}
            </Fragment>
          );
        })}
      </>
    );
  }
}
