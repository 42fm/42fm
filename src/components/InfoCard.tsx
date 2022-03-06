import React from "react";
import { ReactChild, ReactFragment, ReactPortal } from "react";
import styled from "styled-components";

interface Props {
  left?: boolean | ReactChild | ReactFragment | ReactPortal;
  text: string;
  right?: boolean | ReactChild | ReactFragment | ReactPortal;
}

const Wrapper = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 8px;
  padding: ${props => (props.left || props.right ? "8px" : "16px")} 16px;
  width: 100%;
  background: ${props => props.theme.color.primary};
  border-radius: 8px;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
`;

function InfoCard(props: Props) {
  return (
    <Wrapper {...props}>
      {props.left}
      <Title>{props.text}</Title>
      {props.right}
    </Wrapper>
  );
}

export default InfoCard;
