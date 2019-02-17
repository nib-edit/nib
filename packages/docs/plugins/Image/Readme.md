Plugin that adds support for images in the editor.

### Schema support

| S.No. | Name  | Tag     |
| ----- | ----- | ------- |
| 1     | image | `<img>` |

---

### Toolbar support

```js
<ImagePlugin />
```

```js static
<Editor
  config={{
    plugins: {
      options: "image",
      image: {
        uploadCallback
      }
    },
    toolbar: {
      options: "top",
      top: { options: "image" }
    }
  }}
/>
```

`uploadCallback` above is a function that returns a promise which resolves to give and object with an attribute `link` which is used as `src` for the image.
