import * as React from 'react';
import { ReactChild, useState, useEffect } from 'react';
import { ThemeProvider } from 'emotion-theming';

import defaultTheme from '../../config/theme';
import defaultStyleConfig from '../../config/styles';
import overrideValue from '../../utils/override-value';
import { ThemeType } from '../../types/editor-theme';
import { StyleConfigType } from '../../types/editor-style';

interface NibThemeProviderProps {
  children: ReactChild;
  theme: ThemeType | {};
  styleConfig: StyleConfigType | {};
}

const NibThemeProvider = ({
  children,
  theme,
  styleConfig,
}: NibThemeProviderProps) => {
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

export default NibThemeProvider;
