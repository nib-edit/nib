import * as React from 'react';
import { FunctionComponent, createContext, useContext } from 'react';

import { DefaultConfig } from '../../config/editor';
import overrideValue from '../../utils/override-value';
import { EditorConfig } from '../../types/editor-config';
import getDispatcher from './dispatcher';

const dispatcher = getDispatcher();

export const ConfigContext = createContext<any | undefined>(undefined);

interface ConfigContextProviderProps {
  config?: EditorConfig;
  licenseKey: string;
  children: any;
}

export const ConfigContextProvider: FunctionComponent<ConfigContextProviderProps> = ({
  config: newConfig,
  licenseKey = '',
  children,
}) => {
  const editorConfig = overrideValue(DefaultConfig, newConfig);

  return (
    <ConfigContext.Provider
      value={{ config: editorConfig, dispatcher, licenseKey }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const ConfigContextConsumer = ConfigContext.Consumer;

export const useConfigContext = () => ({
  ...useContext(ConfigContext),
});
