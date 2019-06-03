Plugin that adds support for images in the editor.

<br />

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
      top: {options: "image"}
    }
  }}
/>
```

<br />

`uploadCallback` above is a function that returns a promise which resolves to give and object with an attribute `src` which is used as `src` for the image.
