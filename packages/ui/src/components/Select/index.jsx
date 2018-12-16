import React from "react";
import Select, { components } from "react-select";
import { withTheme } from "emotion-theming";
import PropTypes from "prop-types";

import { getSelectStyles } from "./style";

const Option = props => (
  <components.Option {...props}>
    <props.value.tag>{props.children}</props.value.tag>
  </components.Option>
);

class EditSelect extends React.Component {
  static propTypes = {
    options: PropTypes.array,
    selectedOption: PropTypes.object,
    theme: PropTypes.theme,
    onChange: PropTypes.func,
    theme: PropTypes.object
  };

  state = {
    selectedOption: undefined
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.props.onChange(selectedOption.value.blockType);
  };

  render() {
    const {
      options,
      selectedOption,
      theme: { blockSelect: themeStyle }
    } = this.props;
    return (
      <Select
        onChange={this.handleChange}
        options={options}
        value={selectedOption}
        styles={getSelectStyles(themeStyle)}
        components={{ Option }}
      />
    );
  }
}

export default withTheme(EditSelect);
