import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  height: stretch;
  display: flex;
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    cursor: pointer;
    transform: translate(0%, -50%);
    margin: 0px 4px;
    width: calc(100% - 8px);
    height: 2px;
    background: #adadb8;
    border-radius: 2px;
    pointer-events: none;
  }
`;

const StyledInput = styled.input`
  background: white;
  border-radius: 2px;
  width: 100%;
  background: transparent;
  appearance: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 16px;
    background: ${(props) => props.theme.text.primary};
    cursor: pointer;
    position: relative;
  }
  &::-moz-range-thumb {
    height: 16px;
    width: 16px;
    border-radius: 16px;
    background: ${(props) => props.theme.text.primary};
    cursor: pointer;
    position: relative;
  }
  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    width: 100%;
    height: 16px;
    cursor: pointer;
  }
  &::-moz-range-track {
    background-color: #adadb8;
  }
`;

function Range(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Wrapper>
      <StyledInput type="range" {...props} />
    </Wrapper>
  );
}

export default Range;
