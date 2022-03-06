import icons from "@/icons";
import { Song } from "@typings/index";
import React from "react";
import styled from "styled-components";
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

const Title = styled.h4`
  text-align: center;
  padding: 16px;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
`;

interface Props {
  songs: Song[];
}

function History({ songs }: Props) {
  return (
    <Wrapper>
      <Title>History</Title>
      <Content>
        {songs.length > 0 ? (
          songs.map((song, index) => (
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

export default History;
