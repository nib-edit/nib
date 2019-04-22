import React, {PureComponent, Fragment} from "react";

import {ToolbarButton, Icons, Separator} from "nib-ui";

import {KeymapInfo} from "../keymaps";
import {formatKeymap} from "../../../common/utils/key-format";

export default class Ungrouped extends PureComponent {
  handleChange = evt => {
    this.props.onChange(evt.currentTarget.name);
  };

  render() {
    const {options, selectedBlockType} = this.props;
    return (
      <>
        {options.map((opt, index) => {
          const IconComponent = Icons[opt.value.tag.toUpperCase()];
          return (
            <Fragment key={`block-btn-${opt.value.tag}`}>
              <ToolbarButton
                name={opt.value.blockType}
                onClick={this.handleChange}
                selected={opt.value.tag === selectedBlockType}
                title={formatKeymap(KeymapInfo[opt.value.tag])}
              >
                <IconComponent />
              </ToolbarButton>
              {index < options.length - 1 && <Separator type="toolbar" />}
            </Fragment>
          );
        })}
      </>
    );
  }
}
