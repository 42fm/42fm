import { defaultIconProps } from "@/utils/icon";
import { UilRefresh, UilUser } from "@iconscout/react-unicons";
import React, { useState } from "react";
import styled from "styled-components";
import modcheck from "../assets/modcheck.gif";
import pepeDS from "../assets/pepeds.gif";
import ButtonIcon from "./ButtonIcon";
import { HorizontalLine } from "./HorizontalLine";
import SongInfo from "./SongInfo";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.color.secondary};
`;

const Content = styled.div`
  max-height: 200px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #1d1d20;
    border: 1px solid ${(props) => props.theme.color.outline};
  }
`;

const SongWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 8px 16px;
  :hover {
    background-color: ${(props) => props.theme.color.primary};
  }
`;

const Title = styled.div`
  text-align: center;
  padding: 16px;
  position: relative;
`;

const TitleText = styled.h4`
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
`;

const AbsoluteButton = styled(ButtonIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const UserCount = styled.div`
  font-weight: 400;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  span {
    display: block;
  }
`;

const UserCountText = styled.span`
  margin-left: 4px;
  font-size: 14px;
  font-weight: 600;
  color: #00f593;
  margin-right: 4px;
`;

interface Props {
  userCount: number;
  playlist: Song[];
  history: Song[];
}

function List({ userCount, playlist, history }: Props) {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  if (isHistoryOpen) {
    return (
      <Wrapper>
        <Title>
          <TitleText>History</TitleText>
          <AbsoluteButton icon={<UilRefresh {...defaultIconProps} />} onClick={() => setIsHistoryOpen((prev) => !prev)} />
        </Title>
        <Content>
          {history.length > 0 ? (
            history.map((song, index) => (
              <SongWrapper key={index}>
                <SongInfo
                  title={song.title}
                  description={song.artist}
                  image={song.imgUrl}
                  yt_id={song.yt_id}
                  username={song.username}
                />
              </SongWrapper>
            ))
          ) : (
            <SongWrapper>
              <img src={modcheck} alt="modCheck" />
              Any songs?
            </SongWrapper>
          )}
        </Content>
        <HorizontalLine />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Title>
        <UserCount>
          <UserCountText>{userCount}</UserCountText>
          <UilUser {...defaultIconProps} color="#00f593" />
        </UserCount>
        <TitleText>Playlist</TitleText>
        <AbsoluteButton icon={<UilRefresh {...defaultIconProps} />} onClick={() => setIsHistoryOpen((prev) => !prev)} />
      </Title>
      <Content>
        {playlist.length > 0 ? (
          playlist.map((song, index) => (
            <SongWrapper key={index}>
              <SongInfo
                title={song.title}
                description={song.artist}
                image={song.imgUrl}
                yt_id={song.yt_id}
                username={song.username}
              />
            </SongWrapper>
          ))
        ) : (
          <SongWrapper>
            <img src={pepeDS} alt="pepeDS" />
            Add a song and make the chat move!
          </SongWrapper>
        )}
      </Content>
      <HorizontalLine />
    </Wrapper>
  );
}

export default List;
