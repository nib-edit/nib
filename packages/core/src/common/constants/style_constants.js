const Color = {
  border: "#e0e0e0",
  boxShadow: "#cdcdcdbf",
  highlight: "#2962ff",
  lowHighlight: "rgba(41, 98, 255, 0.1)",
  gray1: "#E0E0E0",
  gray2: "#9E9E9E",
  gray3: "#BDBDBD",
  grayText: "#616161",
  lightBorder: "rgba(201,201,201,0.75)",
  text: "#212121",
  white: "#FFFFFF",
  opaque: "rgba(0, 0, 0, 0.5)"
};

const FontSize = {
  large: "16px",
  medium: "14px",
  small: "12px"
};

const DisabledStyle = {
  opacity: 0.5
};

const Border = `1px solid ${Color.border}`;

const BoxShadow = `${Color.boxShadow} 0px 2px 4px -2px,${Color.boxShadow} 0px 0px 1px`;

export default { Color, FontSize, DisabledStyle, Border, BoxShadow };
