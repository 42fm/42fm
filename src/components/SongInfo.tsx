import React from "react";
import styled from "styled-components";
import def from "../assets/logo-64.png";
import Image from "./Image";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  flex: 1;
  min-width: 0;
`;

const TextWrapper = styled.div`
  flex: 1;
  min-width: 0;
  a,
  p {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Title = styled.a`
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: white;
`;

const SubTitle = styled.p`
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: #adadb8;
`;

interface Props {
  title?: string;
  description?: string;
  image?: string;
  yt_id?: string;
  username?: string;
}

function SongInfo({ title = "No Title", description = "No description", image = def, yt_id, username }: Props) {
  return (
    <Wrapper>
      <Image src={image} width="40px" height="40px" />
      <TextWrapper>
        <Title href={`https://youtube.com/watch?v=${yt_id}`} target="_blank" rel="noreferrer noopener">
          {title} by {description}
        </Title>
        <SubTitle>Added by {username}</SubTitle>
      </TextWrapper>
    </Wrapper>
  );
}

export default SongInfo;
