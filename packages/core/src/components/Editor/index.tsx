import * as PropTypes from 'prop-types';
import * as React from 'react';

import NibThemeProvider from '../../context/theme';
import { ConfigContextProvider } from '../../context/config';
import { PMStateProvider } from '../../context/pm-state';

import EditorWrapper from './wrapper';
import { EditorTheme } from '../../types/editor-theme';
import { EditorStyleConfig } from '../../types/editor-style';
import { EditorConfig } from '../../types/editor-config';
import { Addon } from '../../types/addon';
import { ProsemirrorDoc } from '../../types/prosemirror';

interface EditorProps {
  addons?: Addon[];
  autoFocus?: boolean;
  config?: EditorConfig;
  defaultValue?: ProsemirrorDoc;
  licenseKey?: string;
  onChange?: (doc: ProsemirrorDoc) => void;
  spellCheck?: boolean;
  styleConfig?: EditorStyleConfig;
  theme?: EditorTheme;
}

const Editor = ({
  licenseKey = '',
  theme,
  styleConfig,
  config: propsConfig,
  ...rest
}: EditorProps) => (
  <NibThemeProvider theme={{ ...theme }} styleConfig={{ ...styleConfig }}>
    <ConfigContextProvider config={propsConfig} licenseKey={licenseKey}>
      <PMStateProvider>
        <EditorWrapper {...rest} licenseKey={licenseKey} />
      </PMStateProvider>
    </ConfigContextProvider>
  </NibThemeProvider>
);

Editor.propTypes = {
  addons: PropTypes.array,
  autoFocus: PropTypes.bool,
  config: PropTypes.object,
  defaultValue: PropTypes.object,
  licenseKey: PropTypes.string,
  onChange: PropTypes.func,
  spellCheck: PropTypes.bool,
  styleConfig: PropTypes.object,
  theme: PropTypes.object,
};

export default Editor;
