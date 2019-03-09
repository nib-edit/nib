Plugin that adds table support.

### Schema support

| S.No. | Name         | Tag       |
| ----- | ------------ | --------- |
| 1     | table        | `<table>` |
| 2     | table row    | `<tr>`    |
| 3     | table header | `<th>`    |
| 4     | table cell   | `<td>`    |

---

### Toolbar support

```js
<TablePluginDemo />
```

```js static
<Editor
  config={{
    plugins: { options: "table" },
    toolbar: {
      options: "top",
      top: {
        options: "table"
      }
    }
  }}
/>
```
