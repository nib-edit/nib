import * as React from 'react';
import { FunctionComponent, ReactChild, useState, useEffect } from 'react';
import { ThemeProvider } from 'emotion-theming';

import defaultTheme from '../../config/theme';
import defaultStyleConfig from '../../config/styles';
import overrideValue from '../../utils/override-value';
import { EditorTheme } from '../../types/editor-theme';
import { EditorStyleConfig } from '../../types/editor-style';

interface NibThemeProviderProps {
  children: ReactChild;
  theme: EditorTheme | {};
  styleConfig: EditorStyleConfig | {};
}

const NibThemeProvider: FunctionComponent<NibThemeProviderProps> = ({
  children,
  theme,
  styleConfig,
}) => {
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
