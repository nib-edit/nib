import { StyleConstants } from "../../common";

const { Color, FontSize } = StyleConstants;
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
    fontStyle: inherit
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
    backgroundColor: Color.white,
    color: Color.text,
    border: none,
    borderRadius: "2px",
    margin: zero,
    padding: zero,
    height: "28px",
    width: "28px",
    fontSize: FontSize.medium,
    "&:hover": `{
      background-color: ${Color.hover};
    }`,
    "&:selected": `{
      background-color: ${Color.selected};
    }`,
    "&:disabled": `{
      opacity: ${StyleConstants.DisabledStyle.opacity};
    }`
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
    borderBottom: border,
    borderLeft: border,
    borderRight: border,
    borderTop: border,
    borderBottomLeftRadius: "2px",
    borderBottomRightRadius: "2px",
    borderTopLeftRadius: "2px",
    borderTopRightRadius: "2px",
    arrowBorderColor: Color.border,
    arrowBackgroundColor: Color.white,
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

// The function will merge user's theme on top of above theme
export const updateTheme = (theme1, theme2) => {
  if (theme2 === undefined) return theme1;
  if (typeof theme1 === "object") {
    const result = {};
    Object.keys(theme1).forEach(key => {
      if (typeof theme1[key] === "object") {
        result[key] = updateTheme(theme1[key], theme2[key]);
      } else {
        result[key] = theme2[key] === undefined ? theme1[key] : theme2[key];
      }
    });
    return result;
  }
  return theme2 === undefined ? theme1 : theme2;
};

// todo: user should be able to pass additional fields for styling
