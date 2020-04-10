import * as React from 'react';
import { Fragment, ReactElement } from 'react';
import { toggleMark } from 'prosemirror-commands';
import { Mark } from 'prosemirror-model';

import { ToolbarButton, Icon } from 'nib-ui';

import formatKeymap from '../../utils/format-keymap';
import { usePMStateContext } from '../../context/pm-state/index';

import { KeymapInfo } from './keymaps';
import { inlinePluginKey } from './plugin';

type inlineMark = 'strong' | 'em' | 'underline' | 'strike' | 'code';

const MarkIcons = {
  strong: 'bold',
  em: 'italic',
  underline: 'underline',
  strike: 'strike',
  code: 'code'
};

export default ({ config }: { config: { options: string } }) => {
  const { pmstate } = usePMStateContext();
  if (!pmstate) return null;

  const { pmview } = pmstate;
  if (!pmview) return null;

  const getActiveMarks = () => {
    const { state } = pmview;
    const pluginState = inlinePluginKey.getState(state);
    return pluginState && pluginState.activeMarks;
  };

  const isSubsupMarkActive = (activeMarks: Mark[], type: string) => {
    const { state } = pmview;
    const { marks } = state.schema;
    return activeMarks.find(
      (mark: Mark) => mark.type === marks.subsup && mark.attrs.type === type
    );
  };

  const toggleMarkofType = (evt: MouseEvent) => {
    const markName = (evt.currentTarget as HTMLButtonElement).getAttribute(
      'name'
    );
    const { state, dispatch } = pmview;
    const markType = state.schema.marks[markName!];
    toggleMark(markType)(state, dispatch);
  };

  const toggleSupSubMark = (addedMark: string, removedMark: string) => {
    const { state, dispatch } = pmview;
    const { schema, selection, tr } = state;
    const { $from, $to } = selection;
    const { subsup } = schema.marks;
    if (isSubsupMarkActive(getActiveMarks(), addedMark)) {
      dispatch(
        tr
          .removeMark($from.pos, $to.pos, state.schema.marks.subsup)
          .removeStoredMark(state.schema.marks.subsup)
      );
      return;
    }
    if (isSubsupMarkActive(getActiveMarks(), removedMark)) {
      tr.removeMark(
        $from.pos,
        $to.pos,
        state.schema.marks.subsup
      ).removeStoredMark(state.schema.marks.subsup);
    }
    const subSupMark = subsup.create({
      type: addedMark
    });
    tr.addMark($from.pos, $to.pos, subSupMark).setStoredMarks([subSupMark]);
    dispatch(tr);
  };

  const toggleCodeMark = () => {
    const { state, dispatch } = pmstate.pmview;
    const { schema, selection, tr } = state;
    const { $from, $to } = selection;
    const { marks } = schema;
    const { code } = marks;
    if (code.isInSet(getActiveMarks())) {
      tr.removeMark($from.pos, $to.pos, code).setStoredMarks([]);
    } else {
      Object.values(marks).forEach((mark: Mark) => {
        tr.removeMark($from.pos, $to.pos, mark);
      });
      const codeMark = code.create();
      tr.addMark($from.pos, $to.pos, codeMark).setStoredMarks([codeMark]);
    }
    dispatch(tr);
  };

  const toggleSupMark = () => {
    toggleSupSubMark('sup', 'sub');
  };

  const toggleSubMark = () => {
    toggleSupSubMark('sub', 'sup');
  };

  const activeMarks = getActiveMarks();
  const isSupMarkActive = isSubsupMarkActive(activeMarks, 'sup');
  const isSubMarkActive = isSubsupMarkActive(activeMarks, 'sub');

  const { marks } = pmview.state.schema;
  const { options } = config;

  return (
    <>
      {['strong', 'em', 'underline', 'strike'].reduce(
        (result, mark: inlineMark) => {
          if (options.indexOf(mark) >= 0) {
            const isSelected = !!marks[mark].isInSet(activeMarks);
            result.push(
              <Fragment key={`inlinestyle-${mark}`}>
                <ToolbarButton
                  name={mark}
                  onClick={toggleMarkofType}
                  selected={isSelected}
                  title={formatKeymap(KeymapInfo[mark])}
                >
                  <Icon name={MarkIcons[mark]} selected={isSelected} />
                </ToolbarButton>
              </Fragment>
            );
          }
          return result;
        },
        [] as ReactElement[]
      )}
      {options.indexOf('subsup') >= 0 && (
        <>
          <ToolbarButton
            name="sup"
            onClick={toggleSupMark}
            selected={isSupMarkActive}
            title="Superscript"
          >
            <Icon name="sup" selected={isSupMarkActive} />
          </ToolbarButton>
          <ToolbarButton
            name="sub"
            onClick={toggleSubMark}
            selected={isSubMarkActive}
            title="Subscript"
          >
            <Icon name="sub" selected={isSubMarkActive} />
          </ToolbarButton>
        </>
      )}
      {options.indexOf('code') >= 0 && (
        <ToolbarButton
          name="code"
          onClick={toggleCodeMark}
          selected={!!marks.code.isInSet(activeMarks)}
          title={formatKeymap(KeymapInfo.code)}
        >
          <Icon name="code" selected={!!marks.code.isInSet(activeMarks)} />
        </ToolbarButton>
      )}
    </>
  );
};
