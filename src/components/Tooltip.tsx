import {
  arrow,
  autoUpdate,
  flip,
  offset,
  Placement,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import React, { cloneElement, useMemo, useRef, useState } from "react";
import { mergeRefs } from "react-merge-refs";
import styled from "styled-components";

const Popper = styled.div`
  background: white;
  color: black;
  z-index: 10;
  background: #fff;
  color: black;
  font-weight: bold;
  padding: 4px 8px;
  font-size: 13px;
  border-radius: 4px;
  width: max-content;
`;

const Arrow = styled.div`
  height: 8px;
  position: absolute;
  width: 8px;
  rotate: 45deg;
  background: inherit;
  z-index: 10;
`;

interface Props {
  label?: string;
  placement?: Placement;
  children: JSX.Element;
}

const Tooltip = ({ children, label, placement = "top" }: Props) => {
  const [open, setOpen] = useState(false);

  const arrowRef = useRef(null);

  const {
    x,
    y,
    refs,
    strategy,
    context,
    middlewareData,
    placement: finalPlacement,
  } = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    middleware: [
      offset(8),
      flip(),
      shift(),
      arrow({
        element: arrowRef,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context),
    useFocus(context),
    useRole(context, { role: "tooltip" }),
    useDismiss(context),
  ]);

  const ref = useMemo(() => mergeRefs([refs.setReference, (children as any).ref]), [refs.setReference, children]);

  const staticSide = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right",
  }[finalPlacement.split("-")[0]];

  const { x: arrowX, y: arrowY } = middlewareData.arrow ?? { x: null, y: null };

  return (
    <>
      {cloneElement(children, getReferenceProps({ ref, ...children.props }))}
      <div>
        {open && label && (
          <Popper
            ref={refs.setFloating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            {...getFloatingProps()}
          >
            <span>{label}</span>
            <Arrow
              ref={arrowRef}
              style={{
                top: arrowY ?? "",
                left: arrowX ?? "",
                [staticSide!]: "-4px",
              }}
            />
          </Popper>
        )}
      </div>
    </>
  );
};

export default Tooltip;
