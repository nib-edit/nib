const getStyles = (customStyles, stateStyles) => {
  return (style, state) => {
    return {
      ...style,
      ...customStyles,
      ...(stateStyles ? stateStyles(state) : {})
    };
  };
};

export const getSelectStyles = themeStyle => ({
  container: getStyles({
    display: "inline-block",
    backgroundColor: themeStyle.backgroundColor,
    borderRadius: themeStyle.borderRadius,
    fontSize: themeStyle.fontSize,
    fontWeight: "600"
  }),
  control: getStyles(
    {
      backgroundColor: themeStyle.backgroundColor,
      border: themeStyle.border,
      borderRadius: themeStyle.borderRadius,
      boxShadow: themeStyle.boxShadow,
      height: themeStyle.height,
      minHeight: themeStyle.height,
      width: themeStyle.selectWidth,
      "&:hover": themeStyle["&:hover"]
    },
    state => ({
      ...(state.isSelected ? themeStyle["&:selected"] : {})
    })
  ),
  dropdownIndicator: getStyles({
    padding: "4px",
    "& svg": { fill: themeStyle.color }
  }),
  indicatorSeparator: getStyles({
    display: "none"
  }),
  option: getStyles(
    {
      alignItems: "center",
      display: "flex",
      padding: "0 8px",
      color: themeStyle.color,
      height: themeStyle.optionHeight,
      minHeight: themeStyle.optionHeight,
      "&:hover": themeStyle["&:hover"]
    },
    state => ({
      ...(state.isSelected ? themeStyle["&:selected"] : {})
    })
  ),
  menu: getStyles({
    width: themeStyle.dropdownWidth
  })
});
