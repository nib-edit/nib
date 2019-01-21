Plugin that adds support for inline text formatting.

### Schema support

| S.No. | Name      | Tag               |
| ----- | --------- | ----------------- |
| 1     | bold      | `<i>`, `<em>`     |
| 2     | italic    | `<u>`             |
| 3     | underline | `<strong>`, `<b>` |

---

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
      top: { options: "inline" }
    }
  }}
/>
```

---

### Keyboard shortcuts support

| S.No. | Keyboard Shortcut | Description                 |
| ----- | ----------------- | --------------------------- |
| 1     | cmd-b / ctrl-b    | create bold formatting      |
| 2     | cmd-i / ctrl-i    | create italic formatting    |
| 3     | cmd-u / ctrl-u    | create underline formatting |
