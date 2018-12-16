export const getSelectStyles = themeStyle => ({
  container: styles => ({
    ...styles,
    backgroundColor: themeStyle.backgroundColor,
    borderRadius: themeStyle.borderRadius,
    display: "inline-block",
    fontSize: themeStyle.fontSize,
    width: themeStyle.width
  }),
  control: (styles, state) => ({
    ...styles,
    backgroundColor: themeStyle.backgroundColor,
    border: themeStyle.border,
    borderRadius: themeStyle.borderRadius,
    boxShadow: themeStyle.boxShadow,
    height: themeStyle.height,
    minHeight: themeStyle.height,
    ...(state.isSelected ? themeStyle["&:selected"] : {}),
    "&:hover": themeStyle["&:hover"]
  }),
  dropdownIndicator: styles => ({
    ...styles,
    "& svg": { fill: themeStyle.color }
  }),
  indicatorSeparator: () => ({ display: "none" }),
  option: (styles, state) => ({
    ...styles,
    alignItems: "center",
    display: "flex",
    padding: "0 8px",
    color: themeStyle.color,
    height: themeStyle.optionHeight,
    minHeight: themeStyle.height,
    ...(state.isSelected ? themeStyle["&:selected"] : {}),
    "&:hover": themeStyle["&:hover"]
  }),
  menu: styles => ({ ...styles, borderRadius: themeStyle.borderRadius })
});
