import { StyleConstants } from "../../common/constants";

const { Color, FontSize, BoxShadow, Border } = StyleConstants;
const auto = "auto";
const inherit = "inherit";
const none = "none";
const zero = "0px";

export const theme = {
  wrapper: {
    backgroundColor: Color.white,
    borderBottom: Border,
    borderBottomLeftRadius: "2px",
    borderBottomRightRadius: "2px",
    borderLeft: Border,
    borderRight: Border,
    borderTop: Border,
    borderTopLeftRadius: "2px",
    borderTopRightRadius: "2px",
    color: Color.text,
    fontFamily: inherit,
    fontSize: FontSize.medium,
    fontStyle: inherit,
    height: auto,
    padding: zero,
    textAlign: "left",
    width: auto
  },
  editor: {
    backgroundColor: Color.white,
    borderBottom: none,
    borderBottomLeftRadius: zero,
    borderBottomRightRadius: zero,
    borderLeft: none,
    borderRight: none,
    borderTop: none,
    borderTopLeftRadius: zero,
    borderTopRightRadius: zero,
    color: Color.text,
    fontFamily: inherit,
    fontSize: FontSize.medium,
    fontStyle: inherit,
    height: auto,
    padding: "4px",
    width: auto
  },
  button: {
    toolbar: {
      backgroundColor: Color.white,
      border: none,
      borderRadius: "2px",
      color: Color.text,
      fontSize: FontSize.medium,
      height: "28px",
      margin: zero,
      padding: zero,
      width: "28px",
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
      fontSize: FontSize.medium,
      height: "32px",
      margin: zero,
      padding: zero,
      width: "124px",
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
    link: {
      backgroundColor: Color.white,
      border: none,
      borderRadius: zero,
      color: Color.text,
      fontSize: FontSize.medium,
      height: auto,
      margin: zero,
      padding: zero,
      width: auto,
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
    border: none,
    borderRadius: "2px",
    color: Color.text,
    dropdownWidth: "164px",
    fontSize: FontSize.medium,
    height: "28px",
    optionHeight: "44px",
    width: "112px",
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
    border: Border,
    color: Color.text,
    fontSize: FontSize.medium,
    height: "20px",
    margin: "4px 8px",
    padding: "2px",
    width: "180px",
    "&:focus": `{
      border: 1px solid ${Color.highlight};
      outline: none;
    }`
  },
  toolbarSeparator: {
    backgroundColor: Color.lightBorder,
    height: "24px",
    margin: "0px 4px"
  },
  modal: {
    arrowBorderColor: Color.border,
    backgroundColor: Color.white,
    borderBottom: `1px solid ${Color.border}`,
    borderBottomLeftRadius: "2px",
    borderBottomRightRadius: "2px",
    borderLeft: `1px solid ${Color.border}`,
    borderRight: `1px solid ${Color.border}`,
    borderTop: `1px solid ${Color.border}`,
    borderTopLeftRadius: "2px",
    borderTopRightRadius: "2px",
    boxShadow: BoxShadow,
    color: Color.text,
    fontWeight: "600"
  },
  toolbar: {
    top: {
      backgroundColor: Color.white,
      borderBottom: Border,
      borderBottomLeftRadius: zero,
      borderBottomRightRadius: zero,
      borderLeft: none,
      borderRight: none,
      borderTop: none,
      borderTopLeftRadius: zero,
      borderTopRightRadius: zero,
      color: Color.text,
      fontFamily: inherit,
      fontSize: FontSize.medium,
      fontStyle: inherit
    },
    inline: {
      backgroundColor: Color.white,
      borderBottom: none,
      borderBottomLeftRadius: "4px",
      borderBottomRightRadius: "4px",
      borderLeft: none,
      borderRight: none,
      borderTop: none,
      borderTopLeftRadius: "4px",
      borderTopRightRadius: "4px",
      color: Color.text,
      fontFamily: inherit,
      fontSize: FontSize.medium,
      fontStyle: inherit,
      padding: "2px"
    }
  }
};
