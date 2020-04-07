import * as React from 'react';
import { PureComponent, createContext, useContext } from 'react';
import { EditorView } from 'prosemirror-view';

import { ProsemirrorEditorState } from '../../types/prosemirror';

import { ConfigContext } from '../config';

const PMStateContext = createContext<{
  pmstate: ProsemirrorEditorState | undefined;
}>({ pmstate: undefined });

export class PMStateProvider extends PureComponent {
  static contextType = ConfigContext;

  state: { pmstate: ProsemirrorEditorState | undefined } = {
    pmstate: undefined,
  };

  componentDidMount() {
    const { dispatcher } = this.context;
    dispatcher.addListener(this.updateView);
  }

  componentWillUnmount() {
    const { dispatcher } = this.context;
    dispatcher.removeListener(this.updateView);
  }

  updateView = (pmview: EditorView) => {
    this.setState({ pmstate: { pmview } });
  };

  render() {
    const { pmstate } = this.state;
    const { children } = this.props;
    return (
      <PMStateContext.Provider value={{ pmstate }}>
        {children}
      </PMStateContext.Provider>
    );
  }
}

export const PMStateConsumer = PMStateContext.Consumer;

export const usePMStateContext = () => ({
  ...useContext(PMStateContext),
});

// todo: evaluate re-wite using hook
