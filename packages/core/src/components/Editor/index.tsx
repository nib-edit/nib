import * as PropTypes from 'prop-types';
import * as React from 'react';
import { FunctionComponent } from 'react';

import NibThemeProvider from '../../context/theme';
import { ConfigContextProvider } from '../../context/config';
import { PMStateProvider } from '../../context/pm-state';

import { IEditorTheme } from '../../types/editor-theme';
import { IEditorStyleConfig } from '../../types/editor-style';
import { IEditorConfig } from '../../types/editor-config';
import { IAddon } from '../../types/addon';
import { IProsemirrorDoc } from '../../types/prosemirror';

import EditorWrapper from './wrapper';

interface IEditor {
  addons?: IAddon[];
  autoFocus?: boolean;
  config?: IEditorConfig;
  defaultValue?: IProsemirrorDoc;
  licenseKey?: string;
  onChange?: (doc: IProsemirrorDoc) => void;
  spellCheck?: boolean;
  styleConfig?: IEditorStyleConfig;
  theme?: IEditorTheme;
}

const Editor: FunctionComponent<IEditor> = ({
  licenseKey = '',
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
  addons: PropTypes.array,
  autoFocus: PropTypes.bool,
  config: PropTypes.object,
  defaultValue: PropTypes.object,
  licenseKey: PropTypes.string,
  onChange: PropTypes.func,
  spellCheck: PropTypes.bool,
  styleConfig: PropTypes.any,
  theme: PropTypes.any,
};

export default Editor;
