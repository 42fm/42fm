import icons from "@/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { Song } from "@typings/index";
import ButtonIcon from "./ButtonIcon";
import History from "./History";
import { HorizontalLine } from "./HorizontalLine";
import Playlist from "./Playlist";
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

const Title = styled.h4`
  text-align: center;
  padding: 16px;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;

  position: relative;
`;

const AbsoluteButton = styled(ButtonIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

interface Props {
  playlist: Song[];
  history: Song[];
}

function List({ playlist, history }: Props) {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  if (isHistoryOpen) {
    return (
      <Wrapper>
        <Title>
          History
          <AbsoluteButton
            icon={icons.history}
            onClick={() => setIsHistoryOpen((prev) => !prev)}
          />
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
              <img src={icons.modcheck} alt="modCheck" />
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
        Playlist
        <AbsoluteButton
          icon={icons.history}
          onClick={() => setIsHistoryOpen((prev) => !prev)}
        />
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
            <img src={icons.pepeds} alt="pepeDS" />
            Add a song and make the chat move!
          </SongWrapper>
        )}
      </Content>
      <HorizontalLine />
    </Wrapper>
  );
}

export default List;
