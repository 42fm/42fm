import ButtonIcon from "@/components/ButtonIcon";
import { defaultIconProps } from "@/utils/icon";
import {
  UilArrowDownLeft,
  UilArrowDownRight,
  UilArrowUpLeft,
  UilArrowUpRight,
  UilExpandArrows,
  UilVideoSlash,
} from "@iconscout/react-unicons";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Tools = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
  padding: 5px;
  visibility: hidden;
  background-color: ${(props) => props.theme.color.secondary};
  border-radius: 5px;
  margin-left: 5px;
  height: fit-content;
`;

const Wrapper = styled.div`
  position: absolute;
  z-index: 9999;
  border-radius: "8px";
  display: flex;
  :hover ${Tools} {
    visibility: visible;
  }
`;

const PlayerWrapper = styled.div`
  background-color: ${(props) => props.theme.color.primary};
`;

type Vertical = "top" | "bottom";
type Horizontal = "left" | "right";

function YoutubePlayer() {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDown, setIsDown] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  const handleSnap = (y: Vertical, x: Horizontal) => {
    const element = document.querySelector(`[data-a-target="video-player"]`);
    const rect = element?.getBoundingClientRect();

    let top = y === "top" ? rect?.top! : rect?.top! + rect?.height! - ref.current?.clientHeight!;
    let left = x === "left" ? rect?.left! : rect?.left! + rect?.width! - ref.current?.clientWidth!;

    setPosition({ top, left });
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({
        top: event.pageY - offset.y,
        left: event.pageX - offset.x,
      });
    };

    isDown && window.addEventListener("mousemove", handleMouseMove);

    return () => {
      isDown && window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDown]);

  useEffect(() => {
    const savedIsHidden = localStorage.getItem("42fm:hidePlayer") === "true";

    setIsHidden(savedIsHidden);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key !== "42fm:hidePlayer") return;

      const hidePlayer = e.newValue === "true";

      setIsHidden(hidePlayer);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handlePlayerVisibilityChange = () => 
    setIsHidden(oldValue => {
      const newValue = !oldValue;

      localStorage.setItem("42fm:hidePlayer", String(newValue));
    
      return newValue;
    });

  return (
    <Wrapper
      id="42fm-yt-player-wrapper"
      style={{
        top: isHidden ? "-9999px" : position.top,
        left: isHidden ? "-9999px" : position.left,
        zIndex: isHidden ? "-9999" : "9999",
      }}
    >
      <PlayerWrapper
        ref={ref}
        style={{
          padding: "4px",
          resize: "horizontal",
          overflow: "auto",
          aspectRatio: "16 / 9",
        }}
      >
        <div id="42fm-yt-player" style={{ height: "100%", width: "100%", display: "block" }}></div>
      </PlayerWrapper>
      <Tools>
        <ButtonIcon
          icon={<UilExpandArrows {...defaultIconProps} />}
          tooltip="Move"
          placement="right"
          onMouseDown={(e) => {
            setOffset({
              x: e.clientX - ref.current?.getBoundingClientRect().left!,
              y: e.clientY - ref.current?.getBoundingClientRect().top!,
            });
            setIsDown(true);
          }}
          onMouseUp={() => setIsDown(false)}
        />
        <ButtonIcon
          tooltip="Hide player"
          placement="right"
          icon={<UilVideoSlash {...defaultIconProps} />}
          onClick={() => handlePlayerVisibilityChange()}
        />
        <ButtonIcon
          tooltip="Snap to top right"
          placement="right"
          icon={<UilArrowUpRight {...defaultIconProps} />}
          onClick={() => handleSnap("top", "right")}
        />
        <ButtonIcon
          tooltip="Snap to top left"
          placement="right"
          icon={<UilArrowUpLeft {...defaultIconProps} />}
          onClick={() => handleSnap("top", "left")}
        />
        <ButtonIcon
          tooltip="Snap to bottom left"
          placement="right"
          icon={<UilArrowDownLeft {...defaultIconProps} />}
          onClick={() => handleSnap("bottom", "left")}
        />
        <ButtonIcon
          tooltip="Snap to bottom right"
          placement="right"
          icon={<UilArrowDownRight {...defaultIconProps} />}
          onClick={() => handleSnap("bottom", "right")}
        />
      </Tools>
    </Wrapper>
  );
}

export default YoutubePlayer;
