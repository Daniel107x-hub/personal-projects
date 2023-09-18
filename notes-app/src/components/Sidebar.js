import React from "react";

function Sidebar({ children, ...rest }) {
  return <div {...rest}>{children}</div>;
}

export default Sidebar;
