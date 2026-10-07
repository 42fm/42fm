import React from "react";
import styled from "styled-components";

interface WrapperProps {
  $left?: boolean;
  $right?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 8px;
  padding: ${(props) => (props.$left || props.$right ? "10px" : "16px")} 16px;
  width: 100%;
  background: ${(props) => props.theme.color.secondary};
  border-radius: 8px;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  left?: React.ReactNode;
  text: string;
  right?: React.ReactNode;
}

function InfoCard({className,...props}: Props) {
  return (
    <Wrapper $left={!!props.left} $right={!!props.right} className={className}>
      {props.left}
      <Title>{props.text}</Title>
      {props.right}
    </Wrapper>
  );
}

export default InfoCard;
