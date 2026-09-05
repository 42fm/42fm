import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  height: stretch;
  display: flex;
  width: 100px;
  margin-right: 4px;
  margin-left: 4px;
`;

const Fill = styled.div.attrs<{ $value: number }>((props) => ({
  style: {
    width: `${props.$value}%`,
  },
}))`
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  left: 0;
  cursor: pointer;
  transform: translate(0%, -50%);
  height: 2px;
  background: white;
  border-radius: 2px;
  pointer-events: none;
  z-index: -1;
  opacity: 0.6;
`;

const Track = styled.div`
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  left: 0px;
  cursor: pointer;
  transform: translate(0%, -50%);
  width: 100%;
  height: 2px;
  background: #adadb8;
  border-radius: 2px;
  pointer-events: none;
  z-index: -1;
  opacity: 0.6;
`;

const StyledInput = styled.input`
  background: white;
  border-radius: 2px;
  width: 100%;
  height: 100%;
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
`;

function Range(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className, value, ...rest } = props;

  return (
    <Wrapper className={className}>
      <Track />
      <Fill $value={value as number} />
      <StyledInput type="range" value={value} {...rest} />
    </Wrapper>
  );
}

export default Range;
