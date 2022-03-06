import React, { useMemo } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const White = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;

  div {
    width: 2px;
    height: 30px;
    background-color: white;
    border-radius: 2px;
  }
`;

const Purple = styled(White)<{ value: number }>`
  position: absolute;
  right: 0;
  clip-path: ${(props) => `inset(0 ${100 - props.value}% 0 0)`};
  div {
    background-color: #7f00ff;
  }
`;

const getUniqueFromRange = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max - min + 1));
};

function Progress({ audioProgress }: { audioProgress: number }) {
  const divs = useMemo(
    () =>
      Array.from({ length: 80 }).map((item, index) => (
        <div
          key={index}
          style={{
            height: getUniqueFromRange(10, 30),
          }}
        />
      )),
    []
  );

  return (
    <Wrapper>
      <Purple value={audioProgress}>{divs}</Purple>
      <White>{divs}</White>
    </Wrapper>
  );
}

export default Progress;
