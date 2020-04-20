const advanceImage = {
  group: 'block',
  attrs: {
    src: { default: '' },
    height: { default: 'auto' },
    alt: { default: '' },
    alignment: { default: '' },
    wrap: { default: '' },
  },
  draggable: true,
  parseDOM: [
    {
      tag: 'img[src^="data:image/"]',
      ignore: true,
    },
    {
      tag: 'img[src]',
      getAttrs(domNode) {
        return {
          src: domNode.getAttribute('src'),
          style: domNode.getAttribute('style'),
          alt: domNode.getAttribute('alt'),
          alignment: domNode.getAttribute('data-alignment'),
          wrap: domNode.getAttribute('data-wrap'),
        };
      },
    },
  ],
  toDOM(node) {
    const { src, height, alt, alignment, wrap } = node.attrs;
    return [
      'img',
      {
        src,
        style: `height:${height || 'auto'};`,
        alt,
        'data-alignment': alignment,
        'data-wrap': wrap,
      },
    ];
  },
};

export default advanceImage;
