const getStyles = (customStyles, stateStyles) => {
  return (style, state) => {
    return {
      ...style,
      ...customStyles,
      ...(stateStyles ? stateStyles(state) : {})
    };
  };
};

const getSelectStyle = ({ constants, select }) => ({
  container: getStyles({
    backgroundColor: constants.color.background,
    borderRadius: constants.borderRadius,
    display: "inline-block",
    lineHeight: 1,
    ...select.wrapper
  }),
  control: getStyles({
    backgroundColor: constants.color.background,
    border: "none",
    borderRadius: constants.borderRadius,
    boxShadow: "none",
    height: "28px",
    minHeight: "28px",
    width: "112px"
  }),
  dropdownIndicator: getStyles({
    padding: "4px"
  }),
  indicatorSeparator: getStyles({
    display: "none"
  }),
  option: getStyles(
    {
      alignItems: "center",
      display: "flex",
      color: constants.color.text,
      height: "44px",
      minHeight: "44px",
      padding: "0 8px",
      ...select.option
    },
    state => ({
      ...(state.isSelected
        ? {
            backgroundColor: constants.color.background,
            color: constants.color.highlight
          }
        : {}),
      ...(state.isFocused
        ? {
            backgroundColor: constants.color.lightHighlight
          }
        : {})
    })
  ),
  menu: getStyles({
    backgroundColor: constants.color.background,
    color: constants.color.text,
    width: "188px",
    ...select.menu
  }),
  singleValue: getStyles({
    overflow: "visible",
    color: constants.color.text,
    fontSize: constants.fontSize.medium,
    fontWeight: constants.fontWeight.medium,
    ...select.label
  })
});

export default getSelectStyle;
