import { EditorConfig } from '../types/editor-config';

export const DefaultConfig: EditorConfig = {
  plugins: {
    options: 'block inline color link blockquote list image help',
    color: {
      colors: [
        '#212121',
        '#e0e0e0',
        '#6a1b9a',
        '#0d47a1',
        '#1b5e20',
        '#c62828',
        '#ffeb3b',
      ],
    },
  },
  toolbar: {
    options: 'top',
    top: {
      options: 'block inline color link blockquote list image history help',
      block: { options: 'p h1 h2 h3 h4 h5 h6', grouped: true },
      inline: { options: 'strong em underline strike subsup code' },
    },
    inline: {
      options: 'block inline link list image',
      block: { options: 'p h1 h2 h3', grouped: false },
      inline: { options: 'strong em underline' },
    },
  },
};
