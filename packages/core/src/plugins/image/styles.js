export default ({ constants }) => `
  .nib-image-outer-wrapper {
    display: flex;
    justify-content: center;
    &:focus {
      outline: none;
    }
  }

  .nib-image-wrapper {
    position: relative;
    display: inline-block;
    margin: 0 auto;
    > img {
      width: auto;
    }
  }

  .nib-image-resize-lt {
    height: 10px;
    width: 10px;

    position: absolute;
    left: -5px;
    top: -5px;

    background-color: ${constants.color.highlight.primary};
    cursor: nwse-resize;
  }

  .nib-image-resize-rb {
    background-color: ${constants.color.highlight.primary};
    bottom: 0px;
    cursor: nwse-resize;
  
    height: 10px;
    position: absolute;
    right: -5px;
    width: 10px;
  }

  .nib-image-resize-lb {
    background-color: ${constants.color.highlight.primary};
    bottom: 0px;
    cursor: nesw-resize;
  
    height: 10px;
    left: -5px;
    position: absolute;
    width: 10px;
  }

  .nib-image-resize-rt {
    background-color: ${constants.color.highlight.primary};
    cursor: nesw-resize;

    height: 10px;
    position: absolute;
    right: -5px;
    top: -5px;
    width: 10px;
  }
`;
