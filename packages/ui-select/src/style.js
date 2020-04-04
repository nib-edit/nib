const getStyles = (customStyles, stateStyles) => {
  return (style, state) => {
    return {
      ...style,
      ...customStyles,
      ...(stateStyles ? stateStyles(state) : {}),
    };
  };
};

const getSelectStyle = ({ constants, select }, height, width) => ({
  container: getStyles({
    backgroundColor: constants.color.background.primary,
    borderRadius: constants.borderRadius,
    display: 'inline-block',
    lineHeight: 1,
    ...select.wrapper,
  }),
  control: getStyles({
    backgroundColor: constants.color.background.primary,
    border: 'none',
    borderRadius: constants.borderRadius,
    boxShadow: 'none',
    height: '28px',
    minHeight: height || '28px',
    width: width || '112px',
  }),
  dropdownIndicator: getStyles({
    padding: '4px',
  }),
  indicatorSeparator: getStyles({
    display: 'none',
  }),
  option: getStyles(
    {
      alignItems: 'center',
      display: 'flex',
      color: constants.color.text.primary,
      height: '44px',
      minHeight: '44px',
      padding: '0 8px',
      ...select.option,
    },
    (state) => ({
      ...(state.isSelected
        ? {
            backgroundColor: constants.color.background.primary,
            color: constants.color.highlight.primary,
          }
        : {}),
      ...(state.isFocused
        ? {
            backgroundColor: constants.color.highlight.secondary,
          }
        : {}),
    })
  ),
  menu: getStyles({
    backgroundColor: constants.color.background.primary,
    color: constants.color.text.primary,
    width: '212px',
    ...select.menu,
  }),
  singleValue: getStyles({
    overflow: 'visible',
    color: constants.color.text.primary,
    fontSize: constants.fontSize.medium,
    fontWeight: constants.fontWeight.medium,
    ...select.label,
  }),
});

export default getSelectStyle;
