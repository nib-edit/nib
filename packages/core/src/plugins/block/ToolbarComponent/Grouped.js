import React, { PureComponent } from "react";
import { Select } from "nib-ui";

export default class Grouped extends PureComponent {
  handleChange = option => {
    this.props.onChange(option.value.blockType);
  };

  render() {
    const { options, selectedBlockType } = this.props;
    let selectedOption;
    if (selectedBlockType) {
      selectedOption = options.find(
        opt => opt.value.blockType === selectedBlockType
      );
    } else {
      selectedOption = { value: undefined, label: "Other" };
    }
    return (
      <Select
        onChange={this.handleChange}
        options={options}
        selectedOption={selectedOption}
      />
    );
  }
}
