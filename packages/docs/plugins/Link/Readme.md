Plugin that adds support for links.

### Schema support

| S.No. | Name | Tag   |
| ----- | ---- | ----- |
| 1     | link | `<a>` |

---

### Toolbar support

```js
<LinkPlugin />
```

```js static
<Editor
  config={{
    plugins: { options: "link" },
    toolbar: {
      options: "top",
      top: { options: "link" }
    }
  }}
/>
```

---

### Keyboard shortcuts support

| S.No. | Keyboard Shortcut | Description                |
| ----- | ----------------- | -------------------------- |
| 1     | cmd-k / ctrl-k    | show modal for adding link |
