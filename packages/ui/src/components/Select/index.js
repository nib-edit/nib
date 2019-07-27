import PropTypes from "prop-types";
import React from "react";
import ReactSelect, { components } from "react-select";
import { withTheme } from "emotion-theming";

import Icon from "../Icon";
import Option from "./Option";
import getSelectStyles from "./style";

const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <Icon name="ChevronDown" />
    </components.DropdownIndicator>
  );
};

const Select = props => {
  const {
    className,
    onChange,
    options,
    selectedOption,
    theme: { blockSelect: themeStyle }
  } = props;
  return (
    <ReactSelect
      className={className}
      components={{ Option, DropdownIndicator }}
      onChange={onChange}
      options={options}
      styles={getSelectStyles(themeStyle)}
      value={selectedOption}
    />
  );
};

Select.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array,
  selectedOption: PropTypes.object,
  theme: PropTypes.object
};

export default withTheme(Select);
