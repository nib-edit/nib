const styleFn = ({ constants }) => `
  .ProseMirror .tableWrapper {
    margin-left: 24px;
    width: calc(100% - 48px);
    overflow: visible;
  }
  .ProseMirror table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    overflow: visible;
  }
  .ProseMirror th {
    background-color: ${constants.color.background.secondary};
  }
  .ProseMirror td, .ProseMirror th {
    vertical-align: top;
    box-sizing: border-box;
    position: relative;
  }
  .ProseMirror .column-resize-handle {
    position: absolute;
    right: -2px; top: 0; bottom: 0;
    width: 4px;
    z-index: 20;
    background-color: ${constants.color.highlight.primary};
    pointer-events: none;
  }
  .ProseMirror.resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }
  /* Give selected cells a blue overlay */
  .ProseMirror .selectedCell:after {
    z-index: 2;
    position: absolute;
    content: "";
    left: 0; right: 0; top: 0; bottom: 0;
    background: rgba(41, 98, 255, 0.1);
    pointer-events: none;
    outline: 1px solid ${constants.color.highlight.primary} !important;
  }
  .ProseMirror table td, .ProseMirror table th {
    border: ${constants.border.primary};
  }
  .nib-table_header_ext_top {
    display: inline-block;
    height: 10px;
    left: -1px;
    position: absolute;
    top: -10px;
    width: calc(100% + 1px);

    background-color: #efefef;
    border-bottom: ${constants.border.primary};
    border-left: ${constants.border.primary};
    border-top: ${constants.border.primary};
    box-sizing: border-box;
  }
  .nib-table_header_ext_top_selected {
    background-color: ${constants.color.highlight.primary} !important;
    border: 1px solid ${constants.color.highlight.primary} !important;
  }
  .nib-table_header_ext_top_last {
    border-right: ${constants.border.primary};
    width: calc(100% + 2px);
  }
  .nib-table_header_ext_left {
    display: inline-block;
    height: calc(100% + 1px);
    left: -10px;
    position: absolute;
    top: -1px;
    width: 10px;

    background-color: #efefef;
    border-left: ${constants.border.primary};
    border-right:${constants.border.primary};
    border-top:${constants.border.primary};
    box-sizing: border-box;
  }
  .nib-table_header_ext_left_last {
    border-bottom: ${constants.border.primary};
    height: calc(100% + 2px);
  }
  .nib-table_header_ext_left_selected {
    background-color: ${constants.color.highlight.primary} !important;
    border: 1px solid ${constants.color.highlight.primary} !important;
  }
  .nib-table_header_ext_top_left {
    display: inline-block;
    height: 10px;
    left: -10px;
    position: absolute;
    top: -10px;
    width: 10px;

    background-color: #efefef;
    border: ${constants.border.primary};
    box-sizing: border-box;
  }
  .nib-table_header_ext_top_left_selected {
    background-color: ${constants.color.highlight.primary} !important;
    border: 1px solid ${constants.color.highlight.primary} !important;
  }
`;

export default styleFn;
