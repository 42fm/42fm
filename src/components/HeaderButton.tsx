import { useSettingsState } from "@/pages/content/stores/settings";
import React from "react";
import styled from "styled-components";
import logo from "../assets/logo-32.png";
import ButtonIcon from "./ButtonIcon";

const Wrapper = styled.div`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  width: 3rem;
  height: 3rem;
  position: relative;
`;

const HeaderButton = () => {
  const isOpen = useSettingsState((state) => state.isOpen);
  const setIsOpen = useSettingsState((state) => state.setIsOpen);

  return (
    <Wrapper>
      <ButtonIcon icon={<img src={logo} />} onClick={() => setIsOpen(!isOpen)} tooltip="42FM Settings" placement="bottom" />
    </Wrapper>
  );
};

export default HeaderButton;
