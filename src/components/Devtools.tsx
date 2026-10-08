import { UilArrowLeft, UilArrowRight, UilVideo } from "@iconscout/react-unicons";
import React from "react";
import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { useYoutubePlayerStore } from "@/pages/content/stores/youtube";

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

function Devtools() {
  const setIsOpen = useYoutubePlayerStore((state) => state.setIsOpen);

  const handleGoForward = () => {
    history.pushState(null, "", "/42fm");
    window.dispatchEvent(new PopStateEvent("popstate", { state: null }));
  };

  const handleGoBack = () => {
    history.pushState(null, "", "/videos/2855135807");
    window.dispatchEvent(new PopStateEvent("popstate", { state: null }));
  };

  return (
    <Tools>
      <ButtonIcon
        icon={<UilVideo />}
        onClick={() => setIsOpen((prev) => !prev)}
        tooltip="Toggle Player"
        placement="top-start"
      />
      <ButtonIcon tooltip="Go forward" placement="top-start" icon={<UilArrowLeft />} onClick={handleGoForward} />
      <ButtonIcon tooltip="Go back" placement="top-start" icon={<UilArrowRight />} onClick={handleGoBack} />
    </Tools>
  );
}

export default Devtools;
