const Color = {
  hover: "#E0E0E0",
  border: "#9E9E9E",
  selected: "#BDBDBD",
  white: "#FFFFFF",
  grayText: "#212121"
};

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
    color: Color.grayText,
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
      color: Color.grayText,
      fontStyle: "inherit",
      fontFamily: "inherit",
      button: {
        backgroundColor: Color.white,
        border: border,
        marginLeft: "2px",
        borderRadius: "2px",
        color: Color.grayText,
        height: "32px",
        width: "32px",
        "&:hover": `{
            background-color: ${Color.hover} !important;
          }`,
        "&:selected": `{
            background-color: ${Color.selected};
          }`
      }
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
      color: Color.grayText,
      fontStyle: "inherit",
      fontFamily: "inherit",
      button: {
        backgroundColor: Color.white,
        borderRadius: "2px",
        border: none,
        marginLeft: "2px",
        color: Color.grayText,
        height: "26px",
        width: "26px",
        "&:hover": `{
            background-color: ${Color.hover} !important;
          }`,
        "&:selected": `{
            background-color: ${Color.selected};
          }`
      }
    }
  },
  blockSelect: {
    backgroundColor: Color.white,
    color: Color.grayText,
    border: border,
    borderRadius: "2px",
    boxShadow: "none",
    fontSize: "16px",
    height: "32px",
    optionHeight: "48px",
    width: "164px",
    "&:hover": { backgroundColor: Color.hover },
    "&:selected": { backgroundColor: Color.selected }
  },
  wrapper: {
    backgroundColor: Color.white,
    color: Color.grayText,
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
