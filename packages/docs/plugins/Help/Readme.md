Plugin that adds help option to the editor. It appears towards right of toolbar, currently it shows only the keyboard shortcuts available in the editor. The option is available only in top toolbar.

### Toolbar support

```js
<HelpPlugin />
```

```js static
<Editor
  config={{
    plugins: { options: "help" },
    toolbar: {
      options: "top",
      top: { options: "help" }
    }
  }}
/>
```
