const styleFn = theme => `
  .ProseMirror table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    overflow: hidden;
  }
  .ProseMirror td, .ProseMirror th {
    vertical-align: top;
    box-sizing: border-box;
    position: relative;
  }
  .ProseMirror table td, .ProseMirror table th {
    border: ${theme.table.border};
  }
`;

export default styleFn;
