import PropTypes from "prop-types";
import React from "react";
import ReactSelect from "react-select";
import { withTheme } from "emotion-theming";

import Option from "./Option";
import { getSelectStyles } from "./style";

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
      components={{ Option }}
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
