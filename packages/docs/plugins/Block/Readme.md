Plugin that adds block support.

### Schema support

| S.No. | Name      | Tag    |
| ----- | --------- | ------ |
| 1     | paragraph | `<p>`  |
| 2     | heading 1 | `<h1>` |
| 3     | heading 2 | `<h2>` |
| 4     | heading 3 | `<h3>` |
| 5     | heading 4 | `<h4>` |
| 6     | heading 5 | `<h5>` |
| 7     | heading 6 | `<h6>` |

---

### Toolbar support

Grouped in dropdown

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
        options: "block",
        block: { grouped: false }
      }
    }
  }}
/>
```

---

### Keyboard shortcuts support

| S.No. | Keyboard Shortcut      | Description      |
| ----- | ---------------------- | ---------------- |
| 1     | cmd-alt-0 / ctrl-alt-0 | create paragraph |
| 2     | cmd-alt-1 / ctrl-alt-1 | create heading 1 |
| 3     | cmd-alt-2 / ctrl-alt-2 | create heading 2 |
| 4     | cmd-alt-3 / ctrl-alt-3 | create heading 3 |
| 5     | cmd-alt-4 / ctrl-alt-4 | create heading 4 |
| 6     | cmd-alt-5 / ctrl-alt-5 | create heading 5 |
| 7     | cmd-alt-6 / ctrl-alt-6 | create heading 6 |
