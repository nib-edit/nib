import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { Popup, ToolbarButton, Icon } from 'nib-ui';

import styled from '@emotion/styled';
import { PMStateConsumer } from '../../context/pm-state';
import { colorPluginKey } from './plugin';

const COLORS = [
  '#212121',
  '#e0e0e0',
  '#6a1b9a',
  '#0d47a1',
  '#1b5e20',
  '#c62828',
  '#ffeb3b',
];

class ToolbarComponent extends PureComponent {
  state = { popupMarker: undefined, selectedMarkType: undefined };

  textColorRef = React.createRef();

  backgroundColorRef = React.createRef();

  getActiveColorMarks = () => {
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    const { state } = pmview;
    const pluginState = colorPluginKey.getState(state);
    return pluginState && pluginState.activeColorMarks;
  };

  toggleColorType = evt => {
    const color = evt.target.getAttribute('name');
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    const { selectedMarkType } = this.state;
    const { state, dispatch } = pmview;
    const { schema, selection, tr } = state;
    const { $from, $to } = selection;
    const markType = schema.marks[selectedMarkType];
    const activeColorMarks = this.getActiveColorMarks();
    if (
      activeColorMarks[selectedMarkType] &&
      activeColorMarks[selectedMarkType].attrs.color === color
    ) {
      tr.removeMark($from.pos, $to.pos, markType).removeStoredMark(markType);
    } else {
      const colorMark = markType.create({ color });
      tr.addMark($from.pos, $to.pos, colorMark).setStoredMarks([colorMark]);
    }
    dispatch(tr);
    this.closeColorSelect();
  };

  openColorSelect = evt => {
    const selectedMarkType = evt.currentTarget.getAttribute('name');
    this.setState({
      popupMarker: this[`${selectedMarkType}Ref`],
      selectedMarkType,
    });
  };

  closeColorSelect = () => {
    this.setState({ popupMarker: undefined, selectedMarkType: undefined });
  };

  render() {
    const { pmstate, editorWrapper } = this.props;
    const { pmview } = pmstate;
    if (!pmview) return null;
    const { popupMarker, selectedMarkType } = this.state;
    const marker = popupMarker && popupMarker.current;
    const activeMarks = this.getActiveColorMarks();
    const selectedTextColor =
      activeMarks.textColor && activeMarks.textColor.attrs.color;
    const selectedBackgroundColor =
      activeMarks.backgroundColor && activeMarks.backgroundColor.attrs.color;

    return (
      <Fragment>
        <ToolbarButton
          forwardRef={this.textColorRef}
          name="textColor"
          onClick={this.openColorSelect}
          selected={!!activeMarks.textColor}
        >
          <Icon
            name="textColor"
            selected={!!activeMarks.textColor}
            selectedColor={selectedTextColor}
          />
        </ToolbarButton>
        <ToolbarButton
          forwardRef={this.backgroundColorRef}
          name="backgroundColor"
          onClick={this.openColorSelect}
          selected={!!activeMarks.backgroundColor}
        >
          <Icon
            name="backgroundColor"
            selected={!!activeMarks.backgroundColor}
            selectedColor={selectedBackgroundColor}
          />
        </ToolbarButton>
        {marker && (
          <Popup
            editorWrapper={editorWrapper}
            marker={marker}
            onClickInsideEditor={this.closeColorSelect}
            onClickOutsideEditor={this.closeColorSelect}
            onEscKeyPress={this.closeColorSelect}
            render={() => (
              <ColorsWrapper onClick={this.toggleColorType}>
                {COLORS.map(color => (
                  <StyledButton
                    key={`${selectedMarkType}-${color}`}
                    name={color}
                    color={color}
                    selected={
                      (selectedMarkType === 'backgroundColor' &&
                        selectedBackgroundColor === color) ||
                      (selectedMarkType === 'textColor' &&
                        selectedTextColor === color)
                    }
                  />
                ))}
              </ColorsWrapper>
            )}
          />
        )}
      </Fragment>
    );
  }
}

ToolbarComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  editorWrapper: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pmstate: PropTypes.object.isRequired,
};

const ColorsWrapper = styled.div`
  display: flex;
`;

const StyledButton = styled(ToolbarButton)`
  background-color: ${({ color }) => color};
  border: ${({ selected }) => (selected ? '0.5px solid white' : 'none')};
  box-shadow: ${({ color, selected }) =>
    selected ? `0px 0px 0px 0.5px ${color}` : 'none'};
  height: 24px;
  margin-right: 4px;
  margin: 2px;
  padding: 0;
  width: 24px;
`;

export default props => (
  <PMStateConsumer>
    {pmstate => <ToolbarComponent pmstate={pmstate} {...props} />}
  </PMStateConsumer>
);
