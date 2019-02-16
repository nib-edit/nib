const Color = {
  active: "#9E9E9E",
  border: "rgba(158, 158, 158, 0.75)",
  highlight: "#065FD4",
  hover: "#F5F5F5",
  lightBorder: "#EbBCF0",
  modalBorder: "#FCFCFCBF",
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

const BoxShadow = `${Color.border} 0px 2px 8px -2px,${
  Color.border
} 0px 0px 1px`;

export default { Color, FontSize, DisabledStyle, BoxShadow };
