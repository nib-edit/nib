export const blockStyles = {
  p: {
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
    marginInlineEnd: "0px",
    fontWeight: "bold"
  },
  h2: {
    display: "block",
    fontSize: "1.5em",
    marginBlockStart: "0.83em",
    marginBlockEnd: "0.83em",
    marginInlineStart: "0px",
    marginInlineEnd: "0px",
    fontWeight: "bold"
  },
  h3: {
    display: "block",
    fontSize: "1.17em",
    marginBlockStart: "1em",
    marginBlockEnd: "1em",
    marginInlineStart: "0px",
    marginInlineEnd: "0px",
    fontWeight: "bold"
  },
  h4: {
    display: "block",
    marginBlockStart: "1.33em",
    marginBlockEnd: "1.33em",
    marginInlineStart: "0px",
    marginInlineEnd: "0px",
    fontWeight: "bold"
  },
  h5: {
    display: "block",
    fontSize: "0.83em",
    marginBlockStart: "1.67em",
    marginBlockEnd: "1.67em",
    marginInlineStart: "0px",
    marginInlineEnd: "0px",
    fontWeight: "bold"
  },
  h6: {
    display: "block",
    fontSize: "0.67em",
    marginBlockStart: "2.33em",
    marginBlockEnd: "2.33em",
    marginInlineStart: "0px",
    marginInlineEnd: "0px",
    fontWeight: "bold"
  }
};

const blockStyleKeys = [
  { cssKey: "display", jsKey: "display" },
  { cssKey: "font-size", jsKey: "fontSize" },
  { cssKey: "font-weight", jsKey: "fontWeight" },
  { cssKey: "margin-block-start", jsKey: "marginBlockStart" },
  { cssKey: "margin-block-end", jsKey: "marginBlockEnd" },
  { cssKey: "margin-inline-start", jsKey: "marginInlineStart" },
  { cssKey: "margin-inline-end", jsKey: "marginInlineEnd" }
];

const getStyleForBlock = blockStyle =>
  blockStyleKeys.reduce(
    (styleStr, key) => `${styleStr}${key.cssKey}:${blockStyle[key.jsKey]};`,
    ""
  );

export const getBlockStyles = blockStyles => `
  p  {${getStyleForBlock(blockStyles.p)}}
  h1 {${getStyleForBlock(blockStyles.h1)}}
  h2 {${getStyleForBlock(blockStyles.h2)}}
  h3 {${getStyleForBlock(blockStyles.h3)}}
  h4 {${getStyleForBlock(blockStyles.h4)}}
  h5 {${getStyleForBlock(blockStyles.h5)}}
  h6 {${getStyleForBlock(blockStyles.h6)}}
`;
