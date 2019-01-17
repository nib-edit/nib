import { PureComponent } from "react";
import Dispatcher from "./dispatcher";

class AppStateWrapper extends PureComponent {
  state = { app_params: {} };

  updateView = view => {
    this.setState({ app_params: { view } });
  };

  componentWillMount() {
    Dispatcher.addListener(this.updateView);
  }

  componentWillUnmount() {
    Dispatcher.removeListener(this.updateView);
  }

  render() {
    return this.props.render(this.state.app_params);
  }
}

export default AppStateWrapper;
