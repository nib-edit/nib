Plugin that adds support for lists.

<br />

### Toolbar support

```js
<ListPlugin />
```

```js static
<Editor
  config={{
    plugins: {options: "list"},
    toolbar: {
      options: "top",
      top: {options: "list"}
    }
  }}
/>
```

<br />

### Keyboard shortcuts support

| S.No. | Keyboard Shortcut      | Description  |
| ----- | ---------------------- | ------------ |
| 1     | cmd-alt-7 / ctrl-alt-7 | ordered list |
| 2     | cmd-alt-8 / ctrl-alt-8 | bullet list  |
| 3     | tab                    | indent       |
| 4     | shift+tab              | outdent      |
