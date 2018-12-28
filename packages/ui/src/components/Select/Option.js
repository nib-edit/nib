import React from "react";
import { components } from "react-select";

export default (Option = props => (
  <components.Option {...props}>
    <props.value.tag>{props.children}</props.value.tag>
  </components.Option>
));
