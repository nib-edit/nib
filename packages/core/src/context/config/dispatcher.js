export default () => ({
  listeners: [],

  addListener(listener) {
    this.listeners.push(listener);
  },

  removeListener(listener) {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  },

  dispatch(pmstate) {
    this.listeners.forEach(listener => {
      listener(pmstate);
    });
  }
});
