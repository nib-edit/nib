Plugin that adds support for lists.

### Schema support

| S.No. | Name         | Tag    |
| ----- | ------------ | ------ |
| 1     | ordered list | `<ol>` |
| 2     | bullet list  | `<ul>` |

---

### Toolbar support

```js
<ListPlugin />
```

```js static
<Editor
  config={{
    plugins: { options: "list" },
    toolbar: {
      options: "top",
      top: { options: "list" }
    }
  }}
/>
```

---

### Keyboard shortcuts support

| S.No. | Keyboard Shortcut      | Description         |
| ----- | ---------------------- | ------------------- |
| 1     | cmd-alt-7 / ctrl-alt-7 | create ordered list |
| 2     | cmd-alt-8 / ctrl-alt-8 | create bullet list  |
| 3     | tab                    | indent              |
| 4     | shift+tab              | outdent             |
