import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "emotion-theming";

import defaultTheme from "../../config/theme";
import defaultStyleConfig from "../../config/styles";
import overrideValue from "../../utils/override-value";

const NibThemeProvider = ({ children, theme, styleConfig }) => {
  const getTheme = () => {
    const newTheme = overrideValue(defaultStyleConfig, styleConfig);
    newTheme.constants = overrideValue(defaultTheme, theme);
    return newTheme;
  };

  const [newTheme, updateTheme] = useState(getTheme());

  useEffect(() => {
    updateTheme(getTheme());
  }, [theme, styleConfig]);

  return <ThemeProvider theme={newTheme}>{children}</ThemeProvider>;
};

NibThemeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  styleConfig: PropTypes.object
};

NibThemeProvider.defaultProps = {
  theme: undefined,
  styleConfig: undefined
};

export default NibThemeProvider;
