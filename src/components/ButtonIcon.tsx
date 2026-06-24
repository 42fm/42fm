import { Placement } from "@floating-ui/react";
import React, { JSX } from "react";
import styled from "styled-components";
import Tooltip from "./Tooltip";
import Icon from "./Icon";

const Wrapper = styled.button`
  display: block;
  padding: 5px;
  border-radius: 8px;
  background-color: transparent;
  cursor: pointer;
  border: none;
  &:hover {
    background-color: ${(props) => props.theme.color.iconHover};
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  user-select: none;
`;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element
  tooltip?: string;
  placement?: Placement;
  noInvert?: boolean;
}

function ButtonIcon(props: Props) {
  const { icon, tooltip, placement, noInvert, ...propsRest } = props;

  if (!props.tooltip) {
    return (
      <Wrapper type="button" {...propsRest}>
        {icon && <Icon>{icon}</Icon>}
        {props.children}
      </Wrapper>
    );
  }

  return (
    <Tooltip label={props.tooltip} placement={props.placement}>
      <Wrapper type="button" {...propsRest}>
        {icon && <Icon>{icon}</Icon>}
        {props.children}
      </Wrapper>
    </Tooltip>
  );
}
export default ButtonIcon;
