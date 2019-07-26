import { ConnectableObservable } from "rxjs";
import StyleConstants from "../../common/constants/style_constants";

const { Color, FontSize, BoxShadow, Border } = StyleConstants;
const auto = "auto";
const inherit = "inherit";
const none = "none";
const zero = "0px";

export default {
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
    bottom: auto,
    color: Color.text,
    fontFamily: inherit,
    fontSize: FontSize.medium,
    fontStyle: inherit,
    height: auto,
    left: auto,
    padding: zero,
    position: "relative",
    right: auto,
    textAlign: "left",
    top: auto,
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
    minHeight: auto,
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
      margin: "0 2px",
      padding: zero,
      width: "28px",
      "&:active": `
      `,
      "&:disabled": `{
        opacity: ${StyleConstants.DisabledStyle.opacity};
      }`,
      "&:focus": `{
        outline: none;
      }`,
      "&:hover": `{
      }`,
      "&:selected": `{
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
        background-color: ${Color.gray2} !important;
      `,
      "&:disabled": `{
        opacity: ${StyleConstants.DisabledStyle.opacity};
      }`,
      "&:focus": `{
        outline: none;
        background-color: ${Color.gray1};
      }`,
      "&:hover": `{
        background-color: ${Color.gray1};
      }`,
      "&:selected": `{
        background-color: ${Color.gray3} !important;
      }`
    },
    link: {
      backgroundColor: none,
      border: none,
      borderRadius: zero,
      color: Color.text,
      textDecoration: "underline",
      fontSize: FontSize.medium,
      height: auto,
      margin: "4px 0",
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
      }`,
      "&:hover": `{
        color: ${Color.highlight};
      }`
    }
  },
  blockSelect: {
    backgroundColor: Color.white,
    border: none,
    borderRadius: "2px",
    color: Color.text,
    dropdownWidth: "188px",
    fontSize: FontSize.medium,
    height: "28px",
    keymapColor: Color.gray2,
    optionHeight: "44px",
    width: "112px",
    "&:focus": {
      backgroundColor: Color.lowHighlight
    },
    "&:selected": { backgroundColor: Color.white, color: Color.highlight }
  },
  icon: {
    fill: Color.text,
    selectedFill: Color.highlight
  },
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
    borderTop: none,
    borderLeft: none,
    borderRight: none,
    borderBottom: "1px solid #757575",
    color: Color.text,
    fontSize: FontSize.medium,
    height: "20px",
    margin: "0 12px 0 0",
    padding: "4px",
    width: "180px",
    "&:focus": `{
      borderTop: none;
      borderLeft: none;
      borderRight: none;
      borderBottom: 1px solid ${Color.highlight};
      outline: none;
    }`
  },
  toolbarSeparator: {
    backgroundColor: Color.lightBorder,
    height: "24px",
    margin: "0px 4px"
  },
  overlay: {
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
    padding: "4px 4px 6px 4px;",
    color: Color.text,
    fontWeight: "600",
    highlight: Color.highlight
  },
  modal: {
    modalBackgroundColor: Color.opaque,
    backgroundColor: Color.white,
    color: Color.text,
    contentBoxShadow: BoxShadow,
    contentBorderRadius: "2px"
  },
  spinner: {
    borderColor: Color.white,
    borderTopColor: Color.highlight,
    borderWidth: "5px",
    height: "24px",
    width: "24px"
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
  },
  uploadModal: {
    backgroundColor: Color.gray1,
    borderActiveColor: Color.highlight,
    borderColor: Color.text,
    height: "240px",
    wdith: "320px"
  },
  table: {
    cell: {
      menuIcon: {
        color: Color.gray2,
        height: 20,
        width: 20,
        "&:hover": `{
          fill: ${Color.text}
        }`
      },
      menuWrapper: {
        border: Border,
        backgroundColor: Color.white,
        color: Color.text,
        fontSize: FontSize.small,
        borderRadius: "2px",
        boxShadow: BoxShadow
      },
      menuOption: {
        borderBottom: Border,
        padding: "5px",
        width: "150px",
        "&:hover": `{
          background-color: ${Color.lowHighlight};
        }`
      }
    },
    border: Border,
    resizeHandle: Color.highlight
  }
};
