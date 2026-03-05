import React from "react";
import styled from "styled-components";

const ShownCheckbox = styled.div`
  width: 36px;
  height: 20px;
  outline: 2px solid white;
  outline-offset: -1px;
  border-radius: 10px;
  position: relative;
  transition: outline 100ms ease-out;
  &::after {
    content: "";
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 6px;
    inset: 4px;
    background: white;
    transition: all 100ms ease-out;
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
  ${HiddenCheckbox}:checked + ${ShownCheckbox} {
    outline: 2px solid ${(props) => props.theme.color.twitch};
    &::after {
      left: 20px;
    }
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
