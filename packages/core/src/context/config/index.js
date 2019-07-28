import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

import getDispatcher from "./dispatcher";
import config from "../../config/editor";
import overrideValue from "../../utils/override-value";

export const ConfigContext = React.createContext();

export const ConfigContextProvider = ({
  config: newConfig,
  licenseKey,
  children
}) => {
  const [dispatcher] = useState(getDispatcher());
  const editorConfig = overrideValue(config, newConfig);

  return (
    <ConfigContext.Provider
      value={{ config: editorConfig, dispatcher, licenseKey }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

ConfigContextProvider.propTypes = {
  config: PropTypes.shape({
    config: PropTypes.object,
    dispatch: PropTypes.func,
    licenseKey: PropTypes.string
  }),
  licenseKey: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

ConfigContextProvider.defaultProps = {
  config: undefined,
  licenseKey: ""
};

export const ConfigContextConsumer = ConfigContext.Consumer;

export const useConfigContext = () => ({
  ...useContext(ConfigContext)
});
