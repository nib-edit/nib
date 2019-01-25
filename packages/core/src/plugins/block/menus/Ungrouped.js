import React, { PureComponent } from "react";

import { Button, Icons, Separator } from "nib-ui";

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
            <React.Fragment key={`block-btn-${opt.name}`}>
              <Button
                name={opt.value.blockType}
                onClick={this.handleChange}
                selected={opt.name === selectedBlockType}
              >
                <IconComponent />
              </Button>
              {index < options.length - 1 && <Separator />}
            </React.Fragment>
          );
        })}
      </>
    );
  }
}
