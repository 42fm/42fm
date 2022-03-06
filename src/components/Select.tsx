import icons from "@/icons";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: inline-block;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  ::before {
    content: "";
    position: absolute;
    background: ${`url(${icons.carrot})`};
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

const Content = styled.select`
  padding: 6px 36px 6px 13px;
  background: ${(props) => props.theme.color.input};
  color: ${(props) => props.theme.text.primary};
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  border-radius: 4px;
  appearance: none;
  border: 1px solid ${(props) => props.theme.color.input};
  :hover {
    border-color: ${(props) => props.theme.color.hover};
  }
`;

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Wrapper>
      <Content {...props}>{props.children}</Content>
    </Wrapper>
  );
}

export default Select;
