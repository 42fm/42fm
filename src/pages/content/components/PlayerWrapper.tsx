import React, { useEffect, useState } from "react";
import { useYoutubePlayerStore } from "../stores/youtube";
import Player from "./Player";
import styled from "styled-components";
import InfoCard from "@/components/InfoCard";
import ButtonIcon from "@/components/ButtonIcon";
import { UilSpinner } from "@iconscout/react-unicons";
import { HorizontalLine } from "@/components/HorizontalLine";
import { Logger } from "@/utils/log";

const Content = styled.div`
  padding: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  gap: 8px;
  background: ${(props) => props.theme.color.secondary};
  position: relative;
`;

const channelRegex =
  /(https:\/\/[a-z]*.twitch.tv\/)(?:(u|popout|moderator)\/)?(?:(?:(creatorcamp|directory|downloads|drops|embed|extensions|jobs|privacy|settings|store|subscriptions|turbo|twitchartists|videos|wallet))|(?:([a-zA-Z0-9_]{3,25})))/;

const getChannelName = (url: string) => {
  const match = url.match(channelRegex);
  if (!match) return null;
  return match[4];
};

const logger = new Logger("PlayerWrapper");

function PlayerWrapper() {
  const player = useYoutubePlayerStore((state) => state.player);
  const [room, setRoom] = useState<string | null>(getChannelName(window.location.href));

  useEffect(() => {
    const handleCallback = () => {
      if (!navigation.currentEntry?.url) {
        return;
      }

      const url = navigation.currentEntry.url;
      const name = getChannelName(url);

      setRoom(name);

      if (!name) {
        logger.info("Channel not detected");
      } else {
        logger.info("Channel detected");
      }
    };

    navigation.addEventListener("navigatesuccess", handleCallback);

    return () => {
      navigation.removeEventListener("navigatesuccess", handleCallback);
    };
  }, []);

  if (!player) {
    return (
      <div>
        <Content>
          <InfoCard text="Loading..." left={<ButtonIcon icon={<UilSpinner />} tooltip="Connect" placement="left" />} />
        </Content>
        <HorizontalLine />
      </div>
    );
  }

  return room && <Player room={room} player={player} />;
}

export default PlayerWrapper;
