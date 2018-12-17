Editor with list option enabled.

```js
<List />
```

Code:

```js static
class EditorList extends Component {
  state = {
    content: {}
  };

  onChange = content => {
    this.setState({ content });
  };

  render() {
    const { content } = this.state;
    return (
      <div>
        <Editor
          plugins="block inline list"
          toolbar="basic"
          onChange={this.onChange}
        />
        <pre>{JSON.stringify(content, null, 4)}</pre>
      </div>
    );
  }
}
```
