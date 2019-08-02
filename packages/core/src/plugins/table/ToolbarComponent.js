import PropTypes from "prop-types";
import React, { PureComponent } from "react";

import { ToolbarButton, Icon } from "nib-ui";

import { PMStateConsumer } from "../../context/pm-state";
import createTable from "./commands";

class ToolbarComponent extends PureComponent {
  insertTable = () => {
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    const { state, dispatch } = pmview;
    createTable(state, dispatch);
  };

  render() {
    return (
      <ToolbarButton name="table" onClick={this.insertTable} title="Table">
        <Icon name="Table" />
      </ToolbarButton>
    );
  }
}

ToolbarComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pmstate: PropTypes.object.isRequired
};

export default props => (
  <PMStateConsumer>
    {pmstate => <ToolbarComponent pmstate={pmstate} {...props} />}
  </PMStateConsumer>
);
