import { Placement } from "@floating-ui/react";
import React from "react";
import styled from "styled-components";
import Tooltip from "./Tooltip";

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

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  tooltip?: string;
  placement?: Placement;
  noInvert?: boolean;
}

function ButtonIcon(props: Props) {
  return (
    <Tooltip label={props.tooltip} placement={props.placement}>
      <Wrapper type="button" {...props}>
        {props.icon}
        {props.children}
      </Wrapper>
    </Tooltip>
  );
}
export default ButtonIcon;
