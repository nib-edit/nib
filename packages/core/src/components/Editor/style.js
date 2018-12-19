import styled from "@emotion/styled";

export const StyledEditor = styled.div`
  border-top: ${({ theme }) => theme.editor.borderTop};
  border-bottom: ${({ theme }) => theme.editor.borderBottom};
  border-left: ${({ theme }) => theme.editor.borderLeft};
  border-right: ${({ theme }) => theme.editor.borderRight};
  border-top-left-radius: ${({ theme }) => theme.editor.borderTopLeftRadius};
  border-top-right-radius: ${({ theme }) => theme.editor.borderTopRightRadius};
  border-bottom-left-radius: ${({ theme }) =>
    theme.editor.borderBottomLeftRadius};
  border-bottom-right-radius: ${({ theme }) =>
    theme.editor.borderBottomRightRadius};
  background-color: ${({ theme }) => theme.editor.backgroundColor};
  color: ${({ theme }) => theme.editor.color};
  font-style: ${({ theme }) => theme.editor.fontStyle};
  font-family: ${({ theme }) => theme.editor.fontFamily};
  padding: 0 4px;
  & .ProseMirror {
    &:focus {
      outline: none;
    }
  }
`;

export const Wrapper = styled.div`
  position: relative;
  border-top: ${({ theme }) => theme.wrapper.borderTop};
  border-bottom: ${({ theme }) => theme.wrapper.borderBottom};
  border-left: ${({ theme }) => theme.wrapper.borderLeft};
  border-right: ${({ theme }) => theme.wrapper.borderRight};
  border-top-left-radius: ${({ theme }) => theme.wrapper.borderTopLeftRadius};
  border-top-right-radius: ${({ theme }) => theme.wrapper.borderTopRightRadius};
  border-bottom-left-radius: ${({ theme }) =>
    theme.wrapper.borderBottomLeftRadius};
  border-bottom-right-radius: ${({ theme }) =>
    theme.wrapper.borderBottomRightRadius};
  background-color: ${({ theme }) => theme.wrapper.backgroundColor};
  color: ${({ theme }) => theme.wrapper.color};
  font-style: ${({ theme }) => theme.wrapper.fontStyle};
  font-family: ${({ theme }) => theme.wrapper.fontFamily};
  p {
    ${({ theme }) => theme.paragraph}
  }
  h1 {
    ${({ theme }) => theme.h1}
  }
  h2 {
    ${({ theme }) => theme.h2}
  }
  h3 {
    ${({ theme }) => theme.h3}
  }
  h4 {
    ${({ theme }) => theme.h4}
  }
  h5 {
    ${({ theme }) => theme.h5}
  }
  h6 {
    ${({ theme }) => theme.h6}
  }
`;
