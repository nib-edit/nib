import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled from '@emotion/styled';

import Icon from '../Icon';

class Modal extends PureComponent {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleKeyPress);
  };

  handleKeyPress = evt => {
    const { hideModal } = this.props;
    if (evt.key === 'Escape') hideModal();
  };

  handleMouseDown = evt => {
    if (evt.button === 0) {
      const { hideModal } = this.props;
      hideModal();
    }
  };

  handleTouchStart = evt => {
    const { hideModal } = this.props;
    if (evt.targetTouches.length === 1) hideModal();
  };

  stopPropagation = evt => evt.stopPropagation();

  render() {
    const { render, title, hideModal } = this.props;
    return (
      <Wrapper
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
      >
        <InnerWrapper
          onMouseDown={this.stopPropagation}
          onTouchStart={this.stopPropagation}
          onClick={this.stopPropagation}
        >
          <Header>
            <Title>{title}</Title>
            <StyledIcon name="cross" onClick={hideModal} />
          </Header>
          <Main>{render()}</Main>
        </InnerWrapper>
      </Wrapper>
    );
  }
}

Modal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const Wrapper = styled.div(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    height: '100%',
    left: '0',
    position: 'fixed',
    top: '0',
    userSelect: 'all',
    width: '100%',
  },
  ({ theme: { constants } }) => ({
    zIndex: 1,
    backgroundColor: constants.color.opaque,
  })
);

const InnerWrapper = styled.div(
  {
    width: '75%',
    height: '75%',
    maxHeight: 750,
    maxWidth: 750,
  },
  ({ theme: { constants, modal } }) => ({
    borderRadius: constants.borderRadius.small,
    boxShadow: constants.boxShadow.primary,

    backgroundColor: constants.color.background.primary,
    color: constants.color.text.primary,

    fontSize: constants.fontSize.large,

    ...modal.wrapper({ theme: constants }),
  })
);

const Header = styled.div(
  {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
  },
  ({ theme: { constants, modal } }) => ({
    boxShadow: constants.boxShadow.secondary,

    ...modal.header({ theme: constants }),
  })
);

const Title = styled.div({}, ({ theme: { constants, modal } }) => ({
  fontSize: constants.fontSize.extraLarge,
  ...modal.title({ theme: constants }),
}));

const StyledIcon = styled(Icon)({ cursor: 'pointer' });

const Main = styled.div(
  { height: 'calc(100% - 102px)', padding: '24px 0' },
  ({ theme: { constants, modal } }) => ({
    ...modal.main({ theme: constants }),
  })
);

export default Modal;
