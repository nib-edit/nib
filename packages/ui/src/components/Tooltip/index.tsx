import * as React from 'react';
import { useState } from 'react';
import styled from '@emotion/styled';

import { EditorStyle } from '../../../../core/src/types/editor-style';

const Tooltip = ({ info, children }: any) => {
  if (!info) return null;

  const [hovered, setHovered] = useState(false);
  const [timeoutObj, setTimeoutObj] = useState<number>();

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => {
      setHovered(true);
      setTimeout(() => {
        setHovered(false);
      }, 4000);
    }, 500);
    setTimeoutObj(timeout as any);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutObj);
    setHovered(false);
  };

  return (
    <Wrapper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {hovered && <Info>{info}</Info>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const Info = styled.div(
  {
    position: 'absolute',
    top: '100%',
    borderRadius: 1,
    fontSize: 12,
    padding: '0 4px',
    whiteSpace: 'nowrap'
  },
  ({ theme }: { theme?: EditorStyle }) => {
    if (!theme) return;
    const { constants } = theme;
    return {
      backgroundColor: constants.color.text.primary,
      color: constants.color.background.primary
    };
  }
);

export default Tooltip;
