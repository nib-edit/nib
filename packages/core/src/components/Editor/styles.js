import styled from "@emotion/styled";

import BlockPlugin from "../../plugins/block";

const prosemirrorStyles = `
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

  .nib-selection-blur-marker {
    background-color: rgb(220,220,220);
  }
`;

export const StyledWrapper = styled(
  styled.div({ position: "relative", textAlign: "left" }, ({ theme }) => {
    const { constants, wrapper } = theme;
    return {
      border: constants.border.medium,
      borderRadius: constants.borderRadius.small,

      backgroundColor: constants.color.background,
      color: constants.color.text,

      fontSize: constants.fontSize.medium,

      ...wrapper({ theme: constants })
    };
  })
)`
  ${({ theme }) => BlockPlugin.styles(theme)}
`;

export const StyledEditor = styled(
  styled.div(
    {
      border: "none",
      overflow: "scroll",
      padding: 4,
      position: "relative",
      textAlign: "left"
    },
    ({ theme: { constants, editor } }) => ({
      backgroundColor: constants.color.background,
      color: constants.color.text,

      fontSize: constants.fontSize.medium,

      ...editor({ theme: constants })
    })
  )
)`
  ${({ theme, pluginStyles }) => pluginStyles(theme)}
  ${prosemirrorStyles}
`;

/** TODO:
 * find a better way in emotion to mix string and object styles,
 * this may need getting in touch with team
 */
