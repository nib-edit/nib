import * as React from 'react';
import { useContext } from 'react';

import getDispatcher from './dispatcher';
import { DefaultConfig } from '../../config/editor';
import overrideValue from '../../utils/override-value';
import { EditorConfig } from '../../types/editor-config';

const dispatcher = getDispatcher();

export const ConfigContext = React.createContext<any | undefined>(undefined);

interface ConfigContextProviderProps {
  config?: EditorConfig;
  licenseKey: string;
  children: any;
}

export const ConfigContextProvider = ({
  config: newConfig,
  licenseKey = '',
  children,
}: ConfigContextProviderProps) => {
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
