Plugin that adds support for links.

<br />

### Toolbar support

```js
<LinkPlugin />
```

```js static
<Editor
  config={{
    plugins: {options: "link"},
    toolbar: {
      options: "top",
      top: {options: "link"}
    }
  }}
/>
```

<br />

### Keyboard shortcuts support

| S.No. | Keyboard Shortcut | Description                |
| ----- | ----------------- | -------------------------- |
| 1     | cmd-k / ctrl-k    | show modal for adding link |
