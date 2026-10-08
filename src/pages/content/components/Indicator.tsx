import React, { useEffect, useState } from "react";
import { useYoutubePlayerStore } from "../stores/youtube";
import styled from "styled-components";
import indicatorAvailable from "@assets/indicator-available.svg";
import indicatorClose from "@assets/indicator-close.svg";
import indicatorNotReady from "@assets/indicator-not-ready.svg";
import indicatorNotAvailable from "@assets/indicator-not-available.svg";
import indicatorDisconnected from "@assets/indicator-disconnected.svg";
import { usePlayerState } from "../stores/player";
import useIsConnected from "@/hooks/useIsConnected";

const Content = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  cursor: pointer;
  user-select: none;
  &:hover {
    background-color: #53535f7a;
  }
`;

const SVGTemp = styled.svg`
  .track,
  .bar {
    fill: none;
    stroke-width: 4;
  }
  .dot {
    fill: #00f593;
  }
  .track {
    stroke: #222225;
  }
  .bar {
    stroke: #00f593;
    stroke-dasharray: 100;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    transition: all 1s linear;
  }
  foreignObject {
    transition: all 1s linear;
  }
  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

interface IndicatorActiveProps {
  progress: number;
}

function IndicatorActive({ progress }: IndicatorActiveProps) {
  return (
    <SVGTemp width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle className="track" cx="10" cy="10" r="8" pathLength="100" />
      <circle className="dot" cx="10" cy="10" r="3" fill="#00f593" />
      <g mask="url(#custom_mask_id)">
        <mask
          id="custom_mask_id"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="20"
          height="20"
        >
          <circle className="bar" cx="10" cy="10" r="8" pathLength="100" strokeDashoffset={100 - progress} />
        </mask>

        <g clipPath="url(#clip_path_id)" data-figma-skip-parse="true">
          <g transform="matrix(0 -0.0103333 0.0103333 0 10 10)">
            <foreignObject
              x="-1032.26"
              y="-1032.26"
              width="2064.52"
              height="2064.52"
              transform={`rotate(${(360 / 100) * progress})`}
            >
              <div
                id="gradient_div"
                style={{
                  background:
                    "conic-gradient(from 90deg, transparent 0deg, #00f59388 180deg, #00f593ff 300deg, white 360deg)",
                  height: "100%",
                  width: "100%",
                  opacity: "1",
                }}
              ></div>
            </foreignObject>
          </g>
        </g>
        <rect x="-2.49023" y="12.5096" width="30" height="30" transform="rotate(-30 -2.49023 12.5096)" />
      </g>
      <defs>
        <clipPath id="clip_path_id">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </SVGTemp>
  );
}

function Indicator() {
  const player = useYoutubePlayerStore((state) => state.player);
  const [state, setState] = useState<"playing" | "available" | "not-available" | "disconnected">("available");

  const isConnected = useIsConnected();
  const isAvailable = usePlayerState((state) => state.isAvailable);
  const isPlaying = usePlayerState((state) => state.isPlaying);

  const [progress, setProgress] = useState<number>(0);
  const isPlayerOpen = usePlayerState((state) => state.isOpen);
  const setisPlayerOpen = usePlayerState((state) => state.setIsOpen);

  useEffect(() => {
    if (!player) return;

    let interval: NodeJS.Timeout;

    if (state === "playing") {
      interval = setInterval(() => {
        const current = Math.ceil(player.getCurrentTime());
        const total = Math.ceil(player.getDuration());

        const newProgress = Math.floor((current / total) * 100);

        setProgress(newProgress);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [player, state]);

  useEffect(() => {
    function handlePlayStateChange(e: YT.OnStateChangeEvent) {
      if (e.data === YT.PlayerState.PLAYING) {
        setState("playing");
      } else {
        setState("available");
      }
    }

    player?.addEventListener("onStateChange", handlePlayStateChange);

    return () => {
      player?.removeEventListener("onStateChange", handlePlayStateChange);
    };
  }, [player]);

  if (isPlayerOpen)
    return (
      <Content onClick={() => setisPlayerOpen(!isPlayerOpen)}>
        <img src={indicatorClose} />
      </Content>
    );

  if (!player)
    return (
      <Content onClick={() => setisPlayerOpen(!isPlayerOpen)}>
        <img src={indicatorNotReady} />
      </Content>
    );

  if (isPlaying)
    return (
      <Content onClick={() => setisPlayerOpen(!isPlayerOpen)}>
        <IndicatorActive progress={progress} />
      </Content>
    );

  if (!isConnected && isAvailable !== false)
    return (
      <Content onClick={() => setisPlayerOpen(!isPlayerOpen)}>
        <img src={indicatorDisconnected} />
      </Content>
    );

  if (isAvailable === false || isAvailable === undefined)
    return (
      <Content onClick={() => setisPlayerOpen(!isPlayerOpen)}>
        <img src={indicatorNotAvailable} />
      </Content>
    );

  return (
    <Content onClick={() => setisPlayerOpen(!isPlayerOpen)}>
      <img src={indicatorAvailable} />
    </Content>
  );
}

export default Indicator;
