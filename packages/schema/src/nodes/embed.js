const embed = {
  group: 'block',
  attrs: {
    html: { default: '' },
  },
  draggable: true,
  parseDOM: [
    {
      tag: 'span[data-nib-embed]',
      getAttrs(domNode) {
        return {
          html: domNode.getAttribute('data-nib-embed'),
        };
      },
    },
  ],
  toDOM(node) {
    return ['div', { 'data-nib-embed': node.attrs.html }];
  },
};

export default embed;
