import React, { PureComponent, Fragment } from "react";

import { ToolbarButton, Icons, Separator } from "nib-ui";

export default class Ungrouped extends PureComponent {
  handleChange = evt => {
    this.props.onChange(evt.currentTarget.name);
  };

  render() {
    const { options, selectedBlockType } = this.props;

    return (
      <>
        {options.map((opt, index) => {
          const IconComponent = Icons[opt.name.toUpperCase()];
          return (
            <Fragment key={`block-btn-${opt.name}`}>
              <ToolbarButton
                name={opt.value.blockType}
                onClick={this.handleChange}
                selected={opt.name === selectedBlockType}
              >
                <IconComponent />
              </ToolbarButton>
              {index < options.length - 1 && <Separator />}
            </Fragment>
          );
        })}
      </>
    );
  }
}
