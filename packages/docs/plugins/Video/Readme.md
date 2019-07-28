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

Currently video can be added only using url, upload support is not available. The editor takes care of finding embed URL of videos from Youtube or Vimeo, for other sources URL provided gets included as is into an iFrame source.
