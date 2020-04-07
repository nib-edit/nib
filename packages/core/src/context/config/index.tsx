import * as React from 'react';
import { FunctionComponent, createContext, useContext } from 'react';

import { DefaultConfig } from '../../config/editor';
import overrideValue from '../../utils/override-value';
import { IEditorConfig } from '../../types/editor-config';
import getDispatcher from './dispatcher';

const dispatcher = getDispatcher();

export const ConfigContext = createContext<any | undefined>(undefined);

interface IConfigContextProvider {
  config?: IEditorConfig;
  licenseKey: string;
  children: any;
}

export const ConfigContextProvider: FunctionComponent<IConfigContextProvider> = ({
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
