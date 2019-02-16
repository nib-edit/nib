import { StyleConstants } from "../../common/constants";

const { Color, FontSize, BoxShadow } = StyleConstants;
const border = `1px solid ${Color.border}`;
const inherit = "inherit";
const none = "none";
const zero = "0px";

export const theme = {
  wrapper: {
    backgroundColor: Color.white,
    color: Color.text,
    borderBottom: border,
    borderLeft: border,
    borderRight: border,
    borderTop: border,
    borderBottomLeftRadius: "2px",
    borderBottomRightRadius: "2px",
    borderTopLeftRadius: "2px",
    borderTopRightRadius: "2px",
    height: "auto",
    width: "auto",
    padding: zero,
    fontFamily: inherit,
    fontSize: FontSize.medium,
    fontStyle: inherit,
    textAlign: "left"
  },
  editor: {
    backgroundColor: Color.white,
    color: Color.text,
    borderBottom: none,
    borderLeft: none,
    borderRight: none,
    borderTop: none,
    borderBottomLeftRadius: zero,
    borderBottomRightRadius: zero,
    borderTopLeftRadius: zero,
    borderTopRightRadius: zero,
    height: "auto",
    width: "auto",
    padding: "4px",
    fontFamily: inherit,
    fontSize: FontSize.medium,
    fontStyle: inherit
  },
  button: {
    toolbar: {
      backgroundColor: Color.white,
      color: Color.text,
      border: none,
      borderRadius: "2px",
      margin: zero,
      padding: zero,
      height: "28px",
      width: "28px",
      fontSize: FontSize.medium,
      "&:active": `
        background-color: ${Color.active} !important;
      `,
      "&:disabled": `{
        opacity: ${StyleConstants.DisabledStyle.opacity};
      }`,
      "&:focus": `{
        outline: none;
        background-color: ${Color.hover};
      }`,
      "&:hover": `{
        background-color: ${Color.hover};
      }`,
      "&:selected": `{
        background-color: ${Color.selected} !important;
      }`
    },
    primary: {
      backgroundColor: Color.highlight,
      border: none,
      borderRadius: "2px",
      color: Color.white,
      margin: zero,
      padding: zero,
      height: "32px",
      width: "124px",
      fontSize: FontSize.medium,
      "&:active": `
        border-radius: 3px !important;
        background-color: ${Color.active} !important;
      `,
      "&:disabled": `{
        opacity: ${StyleConstants.DisabledStyle.opacity};
      }`,
      "&:focus": `{
        outline: none;
        background-color: ${Color.hover};
      }`,
      "&:hover": `{
        background-color: ${Color.hover};
      }`,
      "&:selected": `{
        background-color: ${Color.selected} !important;
      }`
    },
    basic: {
      backgroundColor: Color.white,
      color: Color.text,
      border: none,
      borderRadius: zero,
      margin: zero,
      padding: zero,
      height: "auto",
      width: "auto",
      fontSize: FontSize.medium,
      "&:active": `{
        color: ${Color.highlight};
      }`,
      "&:disabled": `{
        opacity: ${StyleConstants.DisabledStyle.opacity};
      }`,
      "&:focus": `{
        color: ${Color.highlight};
        outline: none;
        text-decoration: underline;
      }`,
      "&:hover": `{
        text-decoration: underline;
      }`
    }
  },
  blockSelect: {
    backgroundColor: Color.white,
    color: Color.text,
    border: none,
    borderRadius: "2px",
    height: "28px",
    optionHeight: "44px",
    width: "112px",
    dropdownWidth: "164px",
    fontSize: FontSize.medium,
    "&:hover": { backgroundColor: Color.hover },
    "&:selected": { backgroundColor: Color.selected }
  },
  icon: { fill: Color.text },
  link: {
    backgroundColor: Color.white,
    color: Color.highlight,
    fontSize: FontSize.small,
    "&:hover": `{
      text-decoration: underline;
    }`
  },
  input: {
    backgroundColor: Color.white,
    color: Color.text,
    border,
    margin: "4px 8px",
    padding: "2px",
    height: "20px",
    width: "180px",
    fontSize: FontSize.medium,
    "&:focus": `{
      border: 1px solid ${Color.highlight};
      outline: none;
    }`
  },
  toolbarSeparator: {
    backgroundColor: Color.lightBorder,
    margin: "0px 4px",
    height: "24px"
  },
  modal: {
    backgroundColor: Color.white,
    color: Color.text,
    borderBottom: `1px solid ${Color.border}`,
    borderLeft: `1px solid ${Color.border}`,
    borderRight: `1px solid ${Color.border}`,
    borderTop: `1px solid ${Color.border}`,
    borderBottomLeftRadius: "2px",
    borderBottomRightRadius: "2px",
    borderTopLeftRadius: "2px",
    borderTopRightRadius: "2px",
    boxShadow: BoxShadow,
    arrowBorderColor: Color.border,
    fontWeight: "600"
  },
  toolbar: {
    top: {
      backgroundColor: Color.white,
      color: Color.text,
      borderBottom: border,
      borderLeft: none,
      borderRight: none,
      borderTop: none,
      borderBottomLeftRadius: zero,
      borderBottomRightRadius: zero,
      borderTopLeftRadius: zero,
      borderTopRightRadius: zero,
      fontFamily: inherit,
      fontSize: FontSize.medium,
      fontStyle: inherit
    },
    inline: {
      backgroundColor: Color.white,
      color: Color.text,
      borderBottom: none,
      borderLeft: none,
      borderRight: none,
      borderTop: none,
      borderBottomLeftRadius: "4px",
      borderBottomRightRadius: "4px",
      borderTopLeftRadius: "4px",
      borderTopRightRadius: "4px",
      padding: "2px",
      fontFamily: inherit,
      fontSize: FontSize.medium,
      fontStyle: inherit
    }
  }
};

// todo: check to ensure use of constants
