const getStyles = (customStyles, stateStyles) => {
  return (style, state) => {
    return {
      ...style,
      ...customStyles,
      ...(stateStyles ? stateStyles(state) : {})
    };
  };
};

export default themeStyle => ({
  container: getStyles({
    display: "inline-block",
    backgroundColor: themeStyle.backgroundColor,
    borderRadius: themeStyle.borderRadius,
    lineHeight: 1
  }),
  control: getStyles(
    {
      backgroundColor: themeStyle.backgroundColor,
      border: themeStyle.border,
      borderRadius: themeStyle.borderRadius,
      boxShadow: "none",
      height: themeStyle.height,
      minHeight: themeStyle.height,
      width: themeStyle.width
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
      color: themeStyle.color,
      height: themeStyle.optionHeight,
      minHeight: themeStyle.optionHeight,
      padding: "0 8px"
    },
    state => ({
      ...(state.isSelected ? themeStyle["&:selected"] : {}),
      ...(state.isFocused ? themeStyle["&:focus"] : {})
    })
  ),
  menu: getStyles({
    width: themeStyle.dropdownWidth,
    color: themeStyle.color,
    backgroundColor: themeStyle.backgroundColor
  }),
  singleValue: getStyles({
    overflow: "visible",
    color: themeStyle.color,
    "&:hover": themeStyle["&:hover"],
    fontSize: 16,
    fontWeight: "400"
  })
});
