import React from "react";
import styled from "styled-components";

const ShownCheckbox = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid white;
  border-radius: 2px;
  position: relative;
  ::after {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    inset: 2px;
    background: ${props => props.theme.color.twitch};
    visibility: hidden;
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
    border: 2px solid ${props => props.theme.color.twitch};
    ::after {
      visibility: visible;
    }
  }
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function Checkbox(props: Props) {
  return (
    <Wrapper>
      <HiddenCheckbox type="checkbox" {...props} />
      <ShownCheckbox />
      {props.label}
    </Wrapper>
  );
}

export default Checkbox;
