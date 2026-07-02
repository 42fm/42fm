import React from "react";
import { useSettingsState } from "../stores/settings";
import Settings from "@/components/Settings/Settings";
import styled from "styled-components";

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function SettingsWrapper() {
  const isOpen = useSettingsState((state) => state.isOpen);
  const setIsOpen = useSettingsState((state) => state.setIsOpen);

  if (!isOpen) return null;

  return (
    <Backdrop
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <Settings />
      </div>
    </Backdrop>
  );
}

export default SettingsWrapper;
