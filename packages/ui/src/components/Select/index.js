import PropTypes from "prop-types";
import React from "react";
import ReactSelect, { components } from "react-select";
import { withTheme } from "emotion-theming";

import Icon from "../Icon";
import Option from "./Option";
import getSelectStyles from "./style";

const DropdownIndicator = props => (
  <components.DropdownIndicator {...props}>
    <Icon name="ChevronDown" />
  </components.DropdownIndicator>
);

const Select = ({ selectedOption, theme, ...rest }) => (
  <ReactSelect
    components={{ Option, DropdownIndicator }}
    styles={getSelectStyles(theme)}
    value={selectedOption}
    {...rest}
  />
);

Select.propTypes = {
  selectedOption: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.object
  }).isRequired,
  theme: PropTypes.shape({
    select: PropTypes.object
  }).isRequired
};

export default withTheme(Select);
