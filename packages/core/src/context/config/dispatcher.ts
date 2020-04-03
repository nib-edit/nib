import { EditorView } from 'prosemirror-view';

interface Listener {
  (view: EditorView): void;
}

interface Dispatcher {
  listeners: Listener[];
  addListener: (listener: Listener) => void;
  removeListener: (listener: Listener) => void;
  dispatch: (view: EditorView) => void;
}

export default (): Dispatcher => ({
  listeners: [],

  addListener(listener: Listener) {
    this.listeners.push(listener);
  },

  removeListener(listener: Listener) {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  },

  dispatch(view: EditorView) {
    this.listeners.forEach(listener => {
      listener(view);
    });
  },
});
