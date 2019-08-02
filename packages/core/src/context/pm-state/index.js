import React, { PureComponent, useContext } from "react";
import PropTypes from "prop-types";

import { ConfigContext } from "../config";

const PMStateContext = React.createContext();

export class PMStateProvider extends PureComponent {
  static contextType = ConfigContext;

  state = { pmstate: {} };

  componentDidMount() {
    const { dispatcher } = this.context;
    dispatcher.addListener(this.updateView);
  }

  componentWillUnmount() {
    const { dispatcher } = this.context;
    dispatcher.removeListener(this.updateView);
  }

  updateView = pmview => {
    this.setState({ pmstate: { pmview } });
  };

  render() {
    const { pmstate } = this.state;
    const { children } = this.props;
    return (
      <PMStateContext.Provider value={pmstate}>
        {children}
      </PMStateContext.Provider>
    );
  }
}

PMStateProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export const PMStateConsumer = PMStateContext.Consumer;

export const usePMStateContext = () => ({
  ...useContext(PMStateContext)
});
