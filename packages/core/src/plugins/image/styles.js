// todo: use theme variables here
export default () => `
  .nib-image-outer-wrapper {
    display: flex;
    justofy-content: center;
  }

  .nib-image-wrapper {
    position: relative;
    display: inline-block;
    margin: 0 auto;
    > img {
      width: auto;
    }
    > img:focus {
      outline: 2px solid #2962ff;
    }
  }

  .nib-image-resize-lt {
    height: 10px;
    width: 10px;

    position: absolute;
    left: -5px;
    top: -5px;

    background-color: #2962ff;
    cursor: nwse-resize;
  }

  .nib-image-resize-rb {
    background-color: #2962ff;
    bottom: 0px;
    cursor: nwse-resize;
  
    height: 10px;
    position: absolute;
    right: -5px;
    width: 10px;
  }

  .nib-image-resize-lb {
    background-color: #2962ff;
    bottom: 0px;
    cursor: nesw-resize;
  
    height: 10px;
    left: -5px;
    position: absolute;
    width: 10px;
  }

  .nib-image-resize-rt {
    background-color: #2962ff;
    cursor: nesw-resize;

    height: 10px;
    position: absolute;
    right: -5px;
    top: -5px;
    width: 10px;
  }
`;
