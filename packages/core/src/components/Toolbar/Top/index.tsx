import * as React from 'react';
import { FunctionComponent, Fragment, MutableRefObject } from 'react';
import styled, { StyledComponent } from '@emotion/styled';

import { Separator } from 'nib-ui';

import getToolbarComponents from '../../../utils/editor/toolbar';
import { useConfigContext } from '../../../context/config';
import { PMStateConsumer } from '../../../context/pm-state';
import { IAddon } from '../../../types/addon';
import { IEditorPlugin } from '../../../types/components';
import { IEditorStyle } from '../../../types/editor-style';
import { IProsemirrorEditorState } from '../../../types/prosemirror';

interface ITop {
  editorWrapper: MutableRefObject<HTMLDivElement | null>;
  addons?: IAddon[];
  pmstate: IProsemirrorEditorState;
}

const Top: FunctionComponent<ITop> = ({
  editorWrapper,
  addons = [],
  pmstate,
}) => {
  if (!pmstate) return null;
  const {
    config: { plugins, toolbar },
  } = useConfigContext();

  const options = getToolbarComponents(
    plugins.options,
    toolbar.top.options,
    addons
  );
  const formattingOption = options.filter(
    (opt: IEditorPlugin) => opt.name !== 'help'
  );
  const HelpOption = options.filter(
    (opt: IEditorPlugin) => opt.name === 'help'
  )[0];

  return (
    <Wrapper onMouseDown={(e: Event) => e.preventDefault()}>
      <ToolbarSection>
        {formattingOption.map((Option: IEditorPlugin, index: number) => (
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

const Wrapper: StyledComponent<any, any, any> = styled.div(
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
    zIndex: 1,
  },
  ({ theme: { constants, toolbar } }: { theme: IEditorStyle }) => ({
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

interface ITopWrapper {
  editorWrapper: MutableRefObject<HTMLDivElement | null>;
  addons?: IAddon[];
}

export default (props: ITopWrapper) => (
  <PMStateConsumer>
    {({ pmstate }: { pmstate: IProsemirrorEditorState }) => (
      <Top pmstate={pmstate} {...props} />
    )}
  </PMStateConsumer>
);
