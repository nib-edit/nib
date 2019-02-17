Plugin that adds history support to the editor. It is by default added to all editors, thus the keyboard support is available in all editors. But it is required to be explicitly added to the toolbar.

### Toolbar support

```js
<HistoryPlugin />
```

```js static
<Editor
  config={{
    plugins: { options: "" },
    toolbar: {
      options: "top",
      top: { options: "history" }
    }
  }}
/>
```

---

### Keyboard shortcuts support

| S.No. | Keyboard Shortcut          | Description |
| ----- | -------------------------- | ----------- |
| 1     | cmd-z / ctrl-z             | undo        |
| 2     | cmd-shift-z / ctrl-shift-i | redo        |
