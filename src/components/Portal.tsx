import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

function Portal({ children, domNode }: { children: ReactNode; domNode: Element }) {
  return createPortal(children, domNode);
}

export default Portal;
