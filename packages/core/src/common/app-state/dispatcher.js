export const getDispatcher = () => ({
  listeners: [],

  addListener: function(listener) {
    this.listeners.push(listener);
  },

  removeListener: function(listener) {
    var index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  },

  dispatch: function(app_params) {
    this.listeners.forEach(listener => {
      listener(app_params);
    });
  }
});
