import React, { useState } from "react";
import styled from "styled-components";
import icons from "../icons";
import ButtonIcon from "./ButtonIcon";
import Portal from "./Portal";
import Settings from "./Settings";

const Tooltip = styled.span`
  top: 135%;
  position: absolute;
  background-color: var(--color-text-base, white);
  color: var(--color-text-tooltip, black);
  text-align: center;
  padding: 2px 0;
  border-radius: 4px;
  font-weight: 600;
  position: absolute;
  width: 11em;
  left: 50%;
  margin-left: -5.5em;
  z-index: 9999;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.1s ease-in 0.2s;
`;

const Wrapper = styled.div`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  width: 3rem;
  height: 3rem;
  position: relative;
  :hover {
    ${Tooltip} {
      visibility: visible;
      opacity: 1;
    }
  }
`;

const root = document.getElementById("root")!;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderButton = () => {
  const [isOpen, setisOpen] = useState(false);
  return (
    <Wrapper>
      <ButtonIcon icon={icons.logo} onClick={() => setisOpen(!isOpen)} tooltip="42FM Settings" placement="bottom-end" />
      <Portal domNode={root}>
        {isOpen && (
          <Backdrop onClick={() => setisOpen(false)}>
            <div onClick={(e) => e.stopPropagation()}>
              <Settings />
            </div>
          </Backdrop>
        )}
      </Portal>
    </Wrapper>
  );
};

export default HeaderButton;
