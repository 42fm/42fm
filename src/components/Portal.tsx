import { ReactNode } from "react";
import { createPortal } from "react-dom";

function Portal({ children, domNode, key }: { children: ReactNode; domNode: Element; key?: string }) {
  return createPortal(children, domNode, key);
}

export default Portal;
