const blockquoteDOM = ['blockquote', 0];

const blockquote = {
  content: 'paragraph+',
  group: 'block',
  parseDOM: [{ tag: 'blockquote' }],
  toDOM() {
    return blockquoteDOM;
  },
};

export default blockquote;
