Plugin that adds support for video in the editor.

<br />

### Toolbar support

```js
<VideoPlugin />
```

```js static
<Editor
  config={{
    plugins: {
      options: "video"
    },
    toolbar: {
      options: "top",
      top: { options: "video" }
    }
  }}
/>
```

<br />

Nib editor takes care of finding embeddable URL of videos from Youtube or Vimeo, for other sources URL provided gets embedded as is into an iFrame.
