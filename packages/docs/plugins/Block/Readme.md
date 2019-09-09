Plugin that adds block support.

<br />

### Toolbar support

Grouped in dropdown (default)

```js
<BlockPluginDemo />
```

```js static
<Editor
  config={{
    plugins: { options: "block" },
    toolbar: {
      options: "top",
      top: {
        options: "block"
      }
    }
  }}
/>
```

<br />

Ungrouped

```js
<BlockPluginDemo grouped={false} />
```

```js static
<Editor
  config={{
    plugins: { options: "block" },
    toolbar: {
      options: "top",
      top: {
        block: { grouped: false }
        options: "block",
      }
    }
  }}
/>
```

<br />

### Keyboard shortcuts support

| S.No. | Keyboard Shortcut      | Description |
| ----- | ---------------------- | ----------- |
| 1     | cmd-alt-0 / ctrl-alt-0 | paragraph   |
| 2     | cmd-alt-1 / ctrl-alt-1 | heading 1   |
| 3     | cmd-alt-2 / ctrl-alt-2 | heading 2   |
| 4     | cmd-alt-3 / ctrl-alt-3 | heading 3   |
| 5     | cmd-alt-4 / ctrl-alt-4 | heading 4   |
| 6     | cmd-alt-5 / ctrl-alt-5 | heading 5   |
| 7     | cmd-alt-6 / ctrl-alt-6 | heading 6   |
