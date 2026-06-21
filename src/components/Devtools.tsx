import { UilArrowLeft, UilArrowRight, UilVideo } from "@iconscout/react-unicons";
import React from "react";
import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";

const Tools = styled.div`
  position: absolute;
  bottom: 8px;
  left: 8px;
  z-index: 99999;
  display: flex;
  gap: 4px;
  padding: 4px;
  background-color: ${(props) => props.theme.color.primary};
  border-radius: 12px;
  height: fit-content;
`;

const handlePlayerVisibilityChange = () => {
  const oldValue = localStorage.getItem("42fm:hidePlayer");
  const newValue = oldValue === "true" ? "false" : "true";

  localStorage.setItem("42fm:hidePlayer", newValue);
  window.dispatchEvent(
    new StorageEvent("storage", {
      key: "42fm:hidePlayer",
      oldValue: oldValue,
      newValue,
    }),
  );
};

function Devtools() {
  const handleGoForward = () => {
    history.pushState(null, "", "/42fm");
    window.dispatchEvent(new PopStateEvent("popstate", { state: null }));
  };

  const handleGoBack = () => {
    history.pushState(null, "", "/loczuk");
    window.dispatchEvent(new PopStateEvent("popstate", { state: null }));
  };

  return (
    <Tools>
      <ButtonIcon
        icon={<UilVideo />}
        onClick={() => handlePlayerVisibilityChange()}
        tooltip="Toggle Player"
        placement="top-start"
      />
      <ButtonIcon tooltip="Go forward" placement="top-start" icon={<UilArrowLeft />} onClick={handleGoForward} />
      <ButtonIcon tooltip="Go back" placement="top-start" icon={<UilArrowRight />} onClick={handleGoBack} />
    </Tools>
  );
}

export default Devtools;
