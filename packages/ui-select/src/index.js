import PropTypes from 'prop-types';
import React from 'react';
import ReactSelect, { components } from 'react-select';
import { withTheme } from 'emotion-theming';

import ChevronDown from './ChevronDown';
import Option from './Option';
import getSelectStyles from './style';

const DropdownIndicator = (props) => (
  <components.DropdownIndicator {...props}>
    <ChevronDown />
  </components.DropdownIndicator>
);

const Select = ({ selectedOption, theme, height, width, ...rest }) => (
  <ReactSelect
    components={{ Option, DropdownIndicator }}
    styles={getSelectStyles(theme, height, width)}
    value={selectedOption}
    {...rest}
  />
);

Select.propTypes = {
  selectedOption: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.object,
  }),
  theme: PropTypes.shape({
    select: PropTypes.object,
  }).isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
};

Select.defaultProps = {
  height: undefined,
  width: undefined,
  selectedOption: undefined,
};

export default withTheme(Select);
