import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo-32.png";
import ButtonIcon from "./ButtonIcon";
import Portal from "./Portal";
import Settings from "./Settings";

const Wrapper = styled.div`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  width: 3rem;
  height: 3rem;
  position: relative;
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper>
      <ButtonIcon icon={<img src={logo} />} onClick={() => setIsOpen(!isOpen)} tooltip="42FM Settings" placement="bottom" />
      {isOpen && (
        <Portal domNode={document.getElementById("root")!}>
          <Backdrop onClick={() => setIsOpen(false)}>
            <div onClick={(e) => e.stopPropagation()}>
              <Settings />
            </div>
          </Backdrop>
        </Portal>
      )}
    </Wrapper>
  );
};

export default HeaderButton;
