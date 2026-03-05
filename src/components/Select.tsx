import { defaultIconProps } from "@/utils/icon";
import { UilAngleDown } from "@iconscout/react-unicons";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: inline-block;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
    width: 20px;
    height: 20px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
`;

const IconContainer = styled(UilAngleDown)`
  content: "";
  position: absolute;
  right: 10px;
  top: 0;
  bottom: 0;
  width: 20px;
  height: 20px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

const Content = styled.select`
  padding: 8px 12px;
  min-width: 100px;
  background: ${(props) => props.theme.color.input};
  color: ${(props) => props.theme.text.primary};
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  border-radius: 8px;
  appearance: none;
  border: 1px solid ${(props) => props.theme.color.input};
  &:hover {
    border-color: ${(props) => props.theme.color.hover};
  }
`;

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Wrapper>
      <Content {...props}>{props.children}</Content>
      <IconContainer {...defaultIconProps} />
    </Wrapper>
  );
}

export default Select;
