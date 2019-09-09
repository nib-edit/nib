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
      top: { options: "image" }
    }
  }}
/>
```

<br />

For users with commercial license of Nib, image upload and save is available from Nib's AWS S3 drive.
<br /><br />
Users can provide their own image upload option by providing `uploadCallback` prop. The function should take care of uploading image and it should return a promise which resolves to give an object with an attribute `src` which is used as `src` for the image.
