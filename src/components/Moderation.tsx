import icons from "@/icons";
import React from "react";
import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";

const Wrapper = styled.div`
  padding: 10px;
  background: ${props => props.theme.color.secondary};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Moderation() {
  return (
    <Wrapper>
      <ButtonIcon icon={icons.cross} />
      <ButtonIcon icon={icons.ban} />
      <ButtonIcon icon={icons.skip} />
      <ButtonIcon icon={icons.checkmark} />
    </Wrapper>
  );
}

export default Moderation;
