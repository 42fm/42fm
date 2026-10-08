import React from "react";
import styled from "styled-components";

const ShownCheckbox = styled.div`
  width: 42px;
  height: 20px;
  border-radius: 10px;
  position: relative;
  transition: all 100ms ease-in-out;
  &::after {
    content: "";
    position: absolute;
    width: 18px;
    height: 12px;
    border-radius: 6px;
    inset: 4px;
    background: #ccc;
    transition: inherit;
  }
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 12px;
    margin: 2px;
    background: ${(props) => props.theme.color.primary};
    transition: inherit;
  }
`;

const HiddenCheckbox = styled.input`
  display: none;
`;

const Wrapper = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 12px;
  cursor: pointer;
  border-radius: 12px;
  background: white;
  transition: all 100ms ease-in-out;
  ${HiddenCheckbox}:checked + ${ShownCheckbox} {
    &::after {
      background: white;
      left: 20px;
    }
    &::before {
      background: #0a0a0a;
    }
  }
  &:has(${HiddenCheckbox}:checked) {
    background: linear-gradient(to top right, #ff7a00, #ff00f5);
  }
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

function Toggle(props: Props) {
  return (
    <Wrapper>
      <HiddenCheckbox type="checkbox" {...props} />
      <ShownCheckbox />
      {props.label}
    </Wrapper>
  );
}

export default Toggle;
