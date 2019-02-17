const Color = {
  border: "rgba(158, 158, 158, 0.75)",
  boxShadow: "#cdcdcdbf",
  highlight: "#065FD4",
  gray1: "#E0E0E0",
  gray2: "#9E9E9E",
  gray3: "#BDBDBD",
  lightBorder: "#EbBCF0",
  text: "#212121",
  white: "#FFFFFF",
  opaque: "rgba(0, 0, 0, 0.25)"
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

const BoxShadow = `${Color.boxShadow} 0px 2px 8px -2px,${
  Color.boxShadow
} 0px 0px 1px`;

export default { Color, FontSize, DisabledStyle, Border, BoxShadow };
