import React, { useState } from "react";

import "./styles.css";

export default ({ content, label = "Click to view JSON output" }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="nib-link_btn"
      >
        {label}
      </button>
      <pre className={expanded ? "nib-pre" : "nib-pre nib-pre_collpased"}>
        {typeof content !== "string"
          ? JSON.stringify(content, null, 4)
          : content}
      </pre>
    </div>
  );
};
