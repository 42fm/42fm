import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  background: white;
  border-radius: 2px;
  width: 100%;
  background: transparent;
  appearance: none;
  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 16px;
    background: ${(props) => props.theme.text.primary};
    cursor: pointer;
    margin-top: -7px;
    position: relative;
  }
  ::-moz-range-thumb {
    height: 16px;
    width: 16px;
    border-radius: 16px;
    background: ${(props) => props.theme.text.primary};
    cursor: pointer;
    margin-top: -7px;
    position: relative;
  }
  ::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    width: 100%;
    height: 2px;
    cursor: pointer;
    background: #adadb8;
    border-radius: 2px;
  }
  ::-moz-range-track {
    background-color: #adadb8;
  }
`;

function Range(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <StyledInput type="range" {...props} />;
}

export default Range;
