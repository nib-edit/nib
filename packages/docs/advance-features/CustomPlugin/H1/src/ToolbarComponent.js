import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { setBlockType } from 'prosemirror-commands';

import { ToolbarButton, Icon } from 'nib-ui';

class ToolbarComponent extends PureComponent {
  setHeadingType = () => {
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    const { state, dispatch } = pmview;
    const nodeType = state.schema.nodes.heading;
    setBlockType(nodeType, {level: 1})(state, dispatch);
    pmview.focus();
  };

  render() {
    return (
      <ToolbarButton onClick={this.setHeadingType} title="Video">
        <span className="video_toolbar_component">
          <Icon name="h1" />
        </span>
      </ToolbarButton>
    );
  }
}

ToolbarComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pmstate: PropTypes.object.isRequired,
};

export default ToolbarComponent;
