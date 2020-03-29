const path = require('path');

module.exports = {
  title: 'Nib',
  serverPort: 6003,
  assetsDir: 'packages/docs/styleguide',
  sections: [
    {
      name: 'Introduction',
      content: 'packages/docs/Introduction/Readme.md',
    },
    {
      name: 'Features',
      content: 'packages/docs/Features/Readme.md',
    },
    {
      name: 'Setup',
      content: 'packages/docs/Setup/Readme.md',
    },
    {
      name: 'Props',
      content: 'packages/docs/Props/Readme.md',
    },
    {
      name: 'Nib Drive',
      content: 'packages/docs/NibDrive/Readme.md',
    },
    {
      name: 'License',
      content: 'packages/docs/License/Readme.md',
    },
    {
      name: 'Demo',
      pagePerSection: true,
      sectionDepth: 1,
      content: 'packages/docs/demo/Readme.md',
      components: [
        'packages/docs/demo/Basic/index.jsx',
        'packages/docs/demo/Block/index.jsx',
        'packages/docs/demo/Inline/index.jsx',
        'packages/docs/demo/Color/index.jsx',
        'packages/docs/demo/Link/index.jsx',
        'packages/docs/demo/Blockquote/index.jsx',
        'packages/docs/demo/List/index.jsx',
        'packages/docs/demo/Image/index.jsx',
        'packages/docs/demo/History/index.jsx',
        'packages/docs/demo/Help/index.jsx',
        'packages/docs/demo/InlineToolbar/index.jsx',
        'packages/docs/demo/Themed/index.jsx',
        'packages/docs/demo/FullPage/index.jsx',
        'packages/docs/demo/ConvertFromHTML/index.jsx',
        'packages/docs/demo/ConvertToHTML/index.jsx',
      ],
    },
    {
      name: 'Advance Features',
      pagePerSection: true,
      sectionDepth: 1,
      content: 'packages/docs/advance-features/Readme.md',
      components: [
        'packages/docs/advance-features/Table/index.jsx',
        'packages/docs/advance-features/AdvanceImage/index.jsx',
        'packages/docs/advance-features/Video/index.jsx',
        'packages/docs/advance-features/CustomPlugin/index.jsx',
        'packages/docs/advance-features/MarkdownConverter/index.jsx',
        'packages/docs/advance-features/Track/index.jsx',
        'packages/docs/advance-features/Comment/index.jsx',
        'packages/docs/advance-features/TrackWithComment/index.jsx',
        'packages/docs/advance-features/Collab/index.jsx',
      ],
    },
    {
      components: [
        'packages/docs/Introduction/TopBar.jsx',
        'packages/docs/License/index.jsx',
      ],
    },
  ],
  exampleMode: 'hide',
  template: {
    favicon: '/pen.png',
  },
  pagePerSection: true,
  theme: {
    color: {
      base: '#212121',
      link: '#0000e4',
      linkHover: '#90a4ae',
      sidebarBackground: '#0000e4',
    },
    fontFamily: {
      base: ['"Roboto"', 'sans-serif'],
      monospace: ['Consolas', '"Liberation Mono"', 'Menlo', 'monospace'],
    },
  },
  getComponentPathLine() {},
  styleguideComponents: {
    LogoRenderer: path.join(__dirname, 'packages/docs/styleguide/Logo'),
    TableOfContentsRenderer: path.join(
      __dirname,
      'packages/docs/styleguide/TableOfContentsRenderer'
    ),
    HeadingRenderer: path.join(
      __dirname,
      'packages/docs/styleguide/HeadingRenderer'
    ),
    StyleGuideRenderer: path.join(
      __dirname,
      'packages/docs/styleguide/StyleGuideRenderer'
    ),
  },
  webpackConfig: {
    resolve: {
      // Add ".ts" and ".tsx" as resolvable extensions.
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/react',
                {
                  plugins: [
                    '@babel/plugin-proposal-class-properties',
                    ['@babel/transform-runtime'],
                  ],
                },
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        { test: /\.svg$|\.png$/, loader: 'url-loader' },
      ],
    },
  },
};
