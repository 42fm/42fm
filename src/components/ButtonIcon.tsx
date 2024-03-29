import React, { useState } from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";

const Wrapper = styled.button`
  display: block;
  padding: 5px;
  border-radius: 4px;
  background-color: transparent;
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.color.iconHover};
  }
  :disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  user-select: none;
`;

const Arrow = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;
  ::before {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
  }

  visibility: hidden;

  ::before {
    visibility: visible;
    content: "";
    transform: rotate(45deg);
  }
`;
const Tooltip = styled.div`
  background: #fff;
  color: black;
  font-weight: bold;
  padding: 4px 8px;
  font-size: 13px;
  border-radius: 4px;
  z-index: 10;
  width: max-content;
  &[data-popper-placement^="top"] > .arrow {
    bottom: -4px;
  }

  &[data-popper-placement^="bottom"] > .arrow {
    top: -4px;
  }

  &[data-popper-placement^="left"] > .arrow {
    right: -4px;
  }

  &[data-popper-placement^="right"] > .arrow {
    left: -4px;
  }
`;

type Placement =
  | "auto"
  | "auto-start"
  | "auto-end"
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "right"
  | "right-start"
  | "right-end"
  | "left"
  | "left-start"
  | "left-end";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  tooltip?: string;
  placement?: Placement;
  noInvert?: boolean;
}

function ButtonIcon(props: Props) {
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      { name: "arrow", options: { element: arrowElement } },
      { name: "offset", options: { offset: [0, 8] } },
    ],
    placement: props.placement || "bottom",
  });
  const [show, setShow] = useState(false);

  return (
    <>
      <Wrapper
        type="button"
        {...props}
        ref={setReferenceElement}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {props.icon}
        {props.children}
      </Wrapper>
      {props.tooltip && show && (
        <Tooltip ref={setPopperElement} style={styles.popper} {...attributes.popper}>
          {props.tooltip}
          <Arrow ref={setArrowElement} style={styles.arrow} className="arrow" />
        </Tooltip>
      )}
    </>
  );
}

export default ButtonIcon;
