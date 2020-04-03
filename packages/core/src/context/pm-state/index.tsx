import * as React from 'react';
import { PureComponent, useContext } from 'react';

import { ConfigContext } from '../config';
import { EditorView } from 'prosemirror-view';
import { ProsemirrorEditorState } from '../../types/prosemirror';

const PMStateContext = React.createContext<{
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
