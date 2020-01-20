import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import styled from '@emotion/styled';

import { Separator } from 'nib-ui';

import getToolbarComponents from '../../../utils/editor/toolbar';
import { useConfigContext } from '../../../context/config';
import { PMStateConsumer } from '../../../context/pm-state';

const Top = ({ editorWrapper, addons, pmstate }) => {
  const {
    config: { plugins, toolbar },
  } = useConfigContext();

  const options = getToolbarComponents(
    plugins.options,
    toolbar.top.options,
    addons
  );
  const formattingOption = options.filter(opt => opt.name !== 'help');
  const HelpOption = options.filter(opt => opt.name === 'help')[0];

  return (
    <Wrapper onMouseDown={e => e.preventDefault()}>
      <ToolbarSection>
        {formattingOption.map((Option, index) => (
          <Fragment key={`top-toolbar-option-${Option.name}`}>
            <Option.toolbarComponent
              config={toolbar.top[Option.name]}
              editorWrapper={editorWrapper}
              pmstate={pmstate}
            />
            {index < formattingOption.length - 1 && <Separator />}
          </Fragment>
        ))}
      </ToolbarSection>
      {HelpOption && <HelpOption.toolbarComponent />}
    </Wrapper>
  );
};

Top.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  editorWrapper: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  addons: PropTypes.array,
  // eslint-disable-next-line react/forbid-prop-types
  pmstate: PropTypes.object.isRequired,
};

Top.defaultProps = {
  addons: [],
};

const Wrapper = styled.div(
  {
    alignItems: 'flex-start',
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',

    position: 'relative',
    padding: 4,

    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',

    userSelect: 'none',
    zIndex: '1',
  },
  ({ theme: { constants, toolbar } }) => ({
    backgroundColor: constants.color.background.primary,
    color: constants.color.text.primary,
    borderBottom: constants.border.primary,
    fontSize: constants.fontSize.medium,

    ...toolbar.top({ theme: constants }),
  })
);

const ToolbarSection = styled.div({
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'wrap',
});

export default props => (
  <PMStateConsumer>
    {pmstate => <Top pmstate={pmstate} {...props} />}
  </PMStateConsumer>
);
