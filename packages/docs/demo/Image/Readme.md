Editor with images option enabled. Click image to resize it. <a target="_blank" href="https://github.com/nib-edit/Nib/blob/master/packages/docs/demo/Image/index.jsx">Code</a>

```js
<Image />
```

<br />
<br />

For users with commercial license of Nib, image upload and save is available from Nib's AWS S3 drive.
<br /><br />
Users can use their own image upload option by providing `uploadCallback` prop. The function should take care of uploading image and it should return a promise which resolves to give an object with an attribute `src` which is used as `src` for the image.
