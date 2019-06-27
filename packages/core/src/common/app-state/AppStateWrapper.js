import {PureComponent} from "react";
import {AppContext} from "../app-context";

class AppStateWrapper extends PureComponent {
  static contextType = AppContext;

  state = {app_params: {}};

  updateView = view => {
    this.setState({app_params: {view}});
  };

  componentWillMount() {
    this.context.dispatcher.addListener(this.updateView);
  }

  componentWillUnmount() {
    this.context.dispatcher.removeListener(this.updateView);
  }

  render() {
    return this.props.render(this.state.app_params);
  }
}

export default AppStateWrapper;
