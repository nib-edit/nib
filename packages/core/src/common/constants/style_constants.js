const Color = {
  border: "rgba(158, 158, 158, 0.75)",
  highlight: "#1C62B9",
  hover: "#E0E0E0",
  lightBorder: "#EbBCF0",
  selected: "#BDBDBD",
  text: "#212121",
  white: "#FFFFFF"
};

const FontSize = {
  large: "16px",
  medium: "14px",
  small: "12px"
};

const DisabledStyle = {
  opacity: 0.5
};

const BoxShadow = `${Color.border} 0px 4px 8px -2px,${
  Color.border
} 0px 0px 1px`;

export default { Color, FontSize, DisabledStyle, BoxShadow };
