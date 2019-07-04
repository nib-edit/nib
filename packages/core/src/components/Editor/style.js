import styled from "@emotion/styled";

import {getBlockStyles} from "./blockStyles";

export const Wrapper = styled.div`
  background-color: ${({theme}) => theme.wrapper.backgroundColor};
  border-bottom-left-radius: ${({theme}) =>
    theme.wrapper.borderBottomLeftRadius};
  border-bottom-right-radius: ${({theme}) =>
    theme.wrapper.borderBottomRightRadius};
  border-bottom: ${({theme}) => theme.wrapper.borderBottom};
  border-left: ${({theme}) => theme.wrapper.borderLeft};
  border-right: ${({theme}) => theme.wrapper.borderRight};
  border-top-left-radius: ${({theme}) => theme.wrapper.borderTopLeftRadius};
  border-top-right-radius: ${({theme}) => theme.wrapper.borderTopRightRadius};
  border-top: ${({theme}) => theme.wrapper.borderTop};
  bottom: ${({theme}) => theme.wrapper.bottom};
  color: ${({theme}) => theme.wrapper.color};
  font-family: ${({theme}) => theme.wrapper.fontFamily};
  font-style: ${({theme}) => theme.wrapper.fontStyle};
  height: ${({theme}) => theme.wrapper.height};
  left: ${({theme}) => theme.wrapper.left};
  padding: ${({theme}) => theme.wrapper.padding};
  position: ${({theme}) => theme.wrapper.position};
  right: ${({theme}) => theme.wrapper.right};
  text-align: ${({theme}) => theme.wrapper.textAlign};
  top: ${({theme}) => theme.wrapper.top};
  width: ${({theme}) => theme.wrapper.width};
  ${({theme}) => getBlockStyles(theme.blockStyles)};
`;

export const StyledEditor = styled.div`
  background-color: ${({theme}) => theme.editor.backgroundColor};
  color: ${({theme}) => theme.editor.color};
  border-bottom: ${({theme}) => theme.editor.borderBottom};
  border-left: ${({theme}) => theme.editor.borderLeft};
  border-right: ${({theme}) => theme.editor.borderRight};
  border-top: ${({theme}) => theme.editor.borderTop};
  border-bottom-left-radius: ${({theme}) =>
    theme.editor.borderBottomLeftRadius};
  border-bottom-right-radius: ${({theme}) =>
    theme.editor.borderBottomRightRadius};
  border-top-left-radius: ${({theme}) => theme.editor.borderTopLeftRadius};
  border-top-right-radius: ${({theme}) => theme.editor.borderTopRightRadius};
  height: ${({theme}) => theme.editor.height};
  width: ${({theme}) => theme.editor.width};
  padding: ${({theme}) => theme.editor.padding};
  font-size: ${({theme}) => theme.editor.fontSize};
  font-style: ${({theme}) => theme.editor.fontStyle};
  font-family: ${({theme}) => theme.editor.fontFamily};
  & .ProseMirror {
    &:focus {
      outline: none;
    }
  }

  // Styles copied from https://github.com/ProseMirror/prosemirror-view/blob/master/style/prosemirror.css
  .ProseMirror {
    position: relative;
  }

  .ProseMirror {
    word-wrap: break-word;
    white-space: pre-wrap;
    -webkit-font-variant-ligatures: none;
    font-variant-ligatures: none;
  }

  .ProseMirror pre {
    white-space: pre-wrap;
  }

  .ProseMirror li {
    position: relative;
  }

  .ProseMirror-hideselection *::selection {
    background: transparent;
  }
  .ProseMirror-hideselection *::-moz-selection {
    background: transparent;
  }
  .ProseMirror-hideselection {
    caret-color: transparent;
  }

  .ProseMirror-selectednode {
    outline: 2px solid #8cf;
  }

  /* Make sure li selections wrap around markers */

  li.ProseMirror-selectednode {
    outline: none;
  }

  li.ProseMirror-selectednode:after {
    content: "";
    position: absolute;
    left: -32px;
    right: -2px;
    top: -2px;
    bottom: -2px;
    border: 2px solid #8cf;
    pointer-events: none;
  }

  ${({theme}) => getBlockStyles(theme.blockStyles)};
  ${({theme, pluginStyles}) => pluginStyles(theme)}
`;

// todo: move list related styles to list plugin.
