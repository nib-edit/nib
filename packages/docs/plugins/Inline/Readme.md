Plugin that adds support for inline text.

<br />

### Toolbar support

```js
<InlinePlugin />
```

```js static
<Editor
  config={{
    plugins: { options: "inline" },
    toolbar: {
      options: "top",
      top: {
        options: "inline",
        inline: { options: "strong em underline strike subsup code" }
      }
    }
  }}
/>
```

<br />

### Keyboard shortcuts support

| S.No. | Keyboard Shortcut          | Description    |
| ----- | -------------------------- | -------------- |
| 1     | cmd-b / ctrl-b             | bold           |
| 2     | cmd-i / ctrl-i             | italic         |
| 3     | cmd-u / ctrl-u             | underline      |
| 4     | cmd-shift-u / ctrl-shift-u | strike through |
