import React, { useState } from "react";
import { withTheme } from "emotion-theming";

export default withTheme(({ theme, render, selected }) => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  let { fill } = theme.icon;
  if (active) fill = theme.icon.activeFill;
  else if (selected) fill = theme.icon.selectedFill;
  else if (hovered) fill = theme.icon.hoveredFill;
  return (
    <span
      role="icon_wrapper"
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {render &&
        render({
          fill
        })}
    </span>
  );
});
