import { PureComponent } from "react";
import { AppContext } from "../app-context";

class AppStateWrapper extends PureComponent {
  static contextType = AppContext;

  state = { appParams: {} };

  updateView = view => {
    this.setState({ appParams: { view } });
  };

  componentWillMount() {
    this.context.dispatcher.addListener(this.updateView);
  }

  componentWillUnmount() {
    this.context.dispatcher.removeListener(this.updateView);
  }

  render() {
    return this.props.render(this.state.appParams);
  }
}

export default AppStateWrapper;
