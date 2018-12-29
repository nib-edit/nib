import { Color, FontSize } from "../../common/style_constants";

const none = "none";
const border = `1px solid ${Color.border}`;

export const theme = {
  editor: {
    backgroundColor: Color.white,
    borderBottom: none,
    borderLeft: none,
    borderRight: none,
    borderTop: none,
    borderTopLeftRadius: "0px",
    borderTopRightRadius: "0px",
    borderBottomLeftRadius: "0px",
    borderBottomRightRadius: "0px",
    color: Color.text,
    fontSize: "14px",
    fontStyle: "inherit",
    fontFamily: "inherit"
  },
  toolbar: {
    htop: {
      backgroundColor: Color.white,
      borderTop: none,
      borderBottom: border,
      borderRight: none,
      borderLeft: none,
      borderTopLeftRadius: "0px",
      borderTopRightRadius: "0px",
      borderBottomLeftRadius: "0px",
      borderBottomRightRadius: "0px",
      color: Color.text,
      fontStyle: FontSize.medium,
      fontFamily: "inherit"
    },
    inline: {
      backgroundColor: Color.white,
      borderTop: border,
      borderBottom: border,
      borderRight: border,
      borderLeft: border,
      borderTopLeftRadius: "4px",
      borderTopRightRadius: "4px",
      borderBottomLeftRadius: "4px",
      borderBottomRightRadius: "4px",
      color: Color.text,
      fontStyle: "inherit",
      fontFamily: "inherit",
      button: {
        backgroundColor: Color.white,
        borderRadius: "2px",
        border: none,
        marginLeft: "2px",
        color: Color.text,
        height: "26px",
        width: "26px",
        "&:hover": `{
            background-color: ${Color.hover} !important;
          }`
      }
    }
  },
  button: {
    backgroundColor: Color.white,
    border: "none",
    marginLeft: "2px",
    marginRight: "0px",
    marginTop: "0px",
    marginBottom: "0px",
    padding: 0,
    borderRadius: "2px",
    color: Color.text,
    height: "28px",
    width: "28px",
    "&:hover": `{
      background-color: ${Color.hover} !important;
    }`,
    "&:selected": `{
      background-color: ${Color.selected} !important;
    }`
  },
  blockSelect: {
    backgroundColor: Color.white,
    color: Color.text,
    border: none,
    borderRadius: "2px",
    boxShadow: "none",
    fontSize: FontSize.medium,
    height: "28px",
    optionHeight: "44px",
    selectWidth: "112px",
    dropdownWidth: "164px",
    "&:hover": { backgroundColor: Color.hover },
    "&:selected": { backgroundColor: Color.selected }
  },
  wrapper: {
    backgroundColor: Color.white,
    color: Color.text,
    borderTop: border,
    borderBottom: border,
    borderRight: border,
    borderLeft: border,
    borderTopLeftRadius: "2px",
    borderTopRightRadius: "2px",
    borderBottomLeftRadius: "2px",
    borderBottomRightRadius: "2px",
    fontStyle: "inherit",
    fontFamily: "inherit"
  },
  paragraph: {
    display: "block",
    marginBlockStart: "1em",
    marginBlockEnd: "1em",
    marginInlineStart: "0px",
    marginInlineEnd: "0px"
  },
  h1: {
    display: "block",
    fontSize: "2em",
    marginBlockStart: "0.67em",
    marginBlockEnd: "0.67em",
    marginInlineStart: "0px",
    marginInlinEnd: "0px",
    fontWeight: "bold"
  },
  icon: { fill: Color.text },
  link: {
    fontSize: FontSize.medium,
    backgroundColor: Color.white,
    color: Color.highlight,
    "&:hover": `{
      text-decoration: underline;
    }`
  },
  input: {
    border,
    height: "20px",
    margin: "4px 12px",
    padding: "2px",
    width: "180px",
    backgroundColor: Color.white,
    color: Color.text,
    fontSize: FontSize.medium,
    "&:focus": `{
      border: 1px solid ${Color.highlight};
      outline: none;
      padding: ${({ theme }) => theme.input.padding};
    }`
  },
  separator: {
    backgroundColor: Color.lightBorder,
    margin: "0px 4px;",
    height: "24px;"
  },
  modal: {
    backgroundColor: Color.white,
    borderBottom: border,
    borderBottomLeftRadius: "2px",
    borderBottomRightRadius: "2px",
    borderColor: Color.border,
    borderLeft: border,
    borderRight: border,
    borderTop: border,
    borderTopLeftRadius: "2px",
    borderTopRightRadius: "2px",
    color: Color.text,
    fontWeight: "600"
  }
};

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

// future: if I can derive a tree of styled like getCompoted style users will not need to repeat many of them
