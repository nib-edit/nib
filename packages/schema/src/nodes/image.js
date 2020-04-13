const image = {
  group: 'inline',
  inline: true,
  attrs: {
    src: { default: '' },
    height: { default: 'auto' },
    alt: { default: '' },
    alignment: { default: '' }
  },
  draggable: true,
  parseDOM: [
    {
      tag: 'img[src^="data:image/"]',
      ignore: true
    },
    {
      tag: 'img[src]',
      getAttrs(domNode) {
        return {
          src: domNode.getAttribute('src'),
          style: domNode.getAttribute('style'),
          alt: domNode.getAttribute('alt'),
          alignment: domNode.getAttribute('data-alignment')
        };
      }
    }
  ],
  toDOM(node) {
    const { src, height, alt, alignment } = node.attrs;
    return [
      'img',
      {
        src,
        style: `height:${height || 'auto'};`,
        alt,
        'data-alignment': alignment
      }
    ];
  }
};

export default image;
