import PropTypes from "prop-types";
import React from "react";
import { Select } from "nib-ui";

const Grouped = ({ options, selectedBlockType, onChange }) => {
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
      onChange={option => onChange(option.value.blockType)}
      options={options}
      selectedOption={selectedOption}
      isSearchable={false}
    />
  );
};

Grouped.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.array.isRequired,
  selectedBlockType: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

Grouped.defaultProps = {
  selectedBlockType: undefined
};

export default Grouped;
