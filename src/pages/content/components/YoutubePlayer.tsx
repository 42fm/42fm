import ButtonIcon from "@/components/ButtonIcon";
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
import { useYoutubePlayerStore } from "../stores/youtube";

const Tools = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: column;
  padding: 4px;
  visibility: hidden;
  background-color: ${(props) => props.theme.color.primary};
  border-radius: 12px;
  margin-left: 4px;
  height: fit-content;
`;

const Wrapper = styled.div`
  position: absolute;
  z-index: 9999;
  border-radius: "8px";
  display: flex;
  &:hover ${Tools} {
    visibility: visible;
  }
`;

const PlayerWrapper = styled.div`
  &:active iframe {
    pointer-events: none;
  }
`;

type Vertical = "top" | "bottom";
type Horizontal = "left" | "right";

function YoutubePlayer() {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDown, setIsDown] = useState(false);
  const isOpen = useYoutubePlayerStore((state) => state.isOpen);
  const setIsOpen = useYoutubePlayerStore((state) => state.setIsOpen);
  const ref = useRef<HTMLDivElement>(null);

  const handleSnap = (y: Vertical, x: Horizontal) => {
    const element = document.querySelector(`[data-a-target="video-player"]`)!;
    const rect = element.getBoundingClientRect();

    let top = rect.top;

    if (y == "bottom" && ref.current) {
      top += rect.height - ref.current.clientHeight;
    }

    let left = rect.left;

    if (x == "right" && ref.current) {
      left += rect.width - ref.current.clientWidth;
    }

    setPosition({ top, left });
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({
        top: event.pageY - offset.y,
        left: event.pageX - offset.x,
      });
    };

    if (isDown) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (isDown) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [isDown]);

  return (
    <Wrapper
      style={{
        top: !isOpen ? "-9999px" : position.top,
        left: !isOpen ? "-9999px" : position.left,
        zIndex: !isOpen ? "-9999" : "9999",
      }}
    >
      <PlayerWrapper
        ref={ref}
        style={{
          width: "380px",
          resize: "horizontal",
          overflow: "auto",
          aspectRatio: "16 / 9",
        }}
      >
        <div id="42fm-yt-player" style={{ height: "100%", width: "100%", display: "block" }}></div>
      </PlayerWrapper>
      <Tools>
        <ButtonIcon
          icon={<UilExpandArrows />}
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
          icon={<UilVideoSlash />}
          onClick={() => setIsOpen((prev) => !prev)}
        />
        <ButtonIcon
          tooltip="Snap to top right"
          placement="right"
          icon={<UilArrowUpRight />}
          onClick={() => handleSnap("top", "right")}
        />
        <ButtonIcon
          tooltip="Snap to top left"
          placement="right"
          icon={<UilArrowUpLeft />}
          onClick={() => handleSnap("top", "left")}
        />
        <ButtonIcon
          tooltip="Snap to bottom left"
          placement="right"
          icon={<UilArrowDownLeft />}
          onClick={() => handleSnap("bottom", "left")}
        />
        <ButtonIcon
          tooltip="Snap to bottom right"
          placement="right"
          icon={<UilArrowDownRight />}
          onClick={() => handleSnap("bottom", "right")}
        />
      </Tools>
    </Wrapper>
  );
}

export default YoutubePlayer;
