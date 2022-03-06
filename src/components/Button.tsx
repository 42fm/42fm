import React from "react";
import styled from "styled-components";

const Wrapper = styled.button<Props>`
  width: ${props => (props.fullWidth ? "100%" : "auto")};
  padding: 16px 16px;
  background: ${props => props.theme.color.twitch};
  border: 1px solid ${props => props.theme.color.twitch};
  border-radius: 8px;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  cursor: pointer;
`;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

function Button(props: Props) {
  return <Wrapper {...props}>{props.children}</Wrapper>;
}

export default Button;
