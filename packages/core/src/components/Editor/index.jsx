import PropTypes from 'prop-types';
import React from 'react';

import NibThemeProvider from '../../context/theme';
import { ConfigContextProvider } from '../../context/config';
import { PMStateProvider } from '../../context/pm-state';

import EditorWrapper from './wrapper';

const Editor = ({
  licenseKey,
  theme,
  styleConfig,
  config: propsConfig,
  ...rest
}) => (
  <NibThemeProvider theme={{ ...theme }} styleConfig={{ ...styleConfig }}>
    <ConfigContextProvider config={propsConfig} licenseKey={licenseKey}>
      <PMStateProvider>
        <EditorWrapper {...rest} licenseKey={licenseKey} />
      </PMStateProvider>
    </ConfigContextProvider>
  </NibThemeProvider>
);

Editor.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  config: PropTypes.object,
  licenseKey: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  styleConfig: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object,
};

Editor.defaultProps = {
  config: undefined,
  licenseKey: '',
  styleConfig: undefined,
  theme: undefined,
};

export default Editor;
