Editor with block formatting and inline formatting options available.

```js
<History />
```

Code:

```js static
class History extends Component {
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
          plugins="block inline history"
          toolbar={{ htop: { options: "block inline history" } }}
          onChange={this.onChange}
        />
        <pre>{JSON.stringify(content, null, 4)}</pre>
      </div>
    );
  }
}

export default History;
```
