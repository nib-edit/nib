export default () => `
  .ProseMirror li {
    position: relative;
  }

  /* Make sure li selections wrap around markers */

  li.ProseMirror - selectednode {
    outline: none;
  }

  li.ProseMirror - selectednode: after {
    content: "";
    position: absolute;
    left: -32px;
    right: -2px;
    top: -2px;
    bottom: -2px;
    border: 2px solid #8cf;
    pointer - events: none;
  }
`;
