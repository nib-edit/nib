import * as React from 'react';
import { FunctionComponent, Fragment, MutableRefObject } from 'react';
import styled, { StyledComponent } from '@emotion/styled';

import { Separator } from 'nib-ui';

import getToolbarComponents from '../../../utils/editor/toolbar';
import { useConfigContext } from '../../../context/config';
import { PMStateConsumer } from '../../../context/pm-state';
import { Addon } from '../../../types/addon';
import { EditorPlugin } from '../../../types/application';
import { EditorStyle } from '../../../types/editor-style';
import { ProsemirrorEditorState } from '../../../types/prosemirror';

interface TopProps {
  editorWrapper: MutableRefObject<HTMLDivElement | null>;
  addons?: Addon[];
  pmstate: ProsemirrorEditorState;
}

const Top: FunctionComponent<TopProps> = ({
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
    (opt: EditorPlugin) => opt.name !== 'help'
  );
  const HelpOption = options.filter(
    (opt: EditorPlugin) => opt.name === 'help'
  )[0];

  return (
    <Wrapper onMouseDown={(e: Event) => e.preventDefault()}>
      <ToolbarSection>
        {formattingOption.map((Option: EditorPlugin, index: number) => {
          if (!Option.toolbarComponent) return null;
          return (
            <Fragment key={`top-toolbar-option-${Option.name}`}>
              <Option.toolbarComponent
                config={toolbar.top[Option.name]}
                editorWrapper={editorWrapper}
                pmstate={pmstate}
              />
              {index < formattingOption.length - 1 && <Separator />}
            </Fragment>
          );
        })}
      </ToolbarSection>
      {HelpOption && HelpOption.toolbarComponent && (
        <HelpOption.toolbarComponent />
      )}
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
  ({ theme: { constants, toolbar } }: { theme: EditorStyle }) => ({
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

interface TopWrapperProps {
  editorWrapper: MutableRefObject<HTMLDivElement | null>;
  addons?: Addon[];
}

export default (props: TopWrapperProps) => (
  <PMStateConsumer>
    {({ pmstate }: { pmstate: ProsemirrorEditorState }) => (
      <Top pmstate={pmstate} {...props} />
    )}
  </PMStateConsumer>
);
