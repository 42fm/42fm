import ButtonIcon from "@/components/ButtonIcon";
import { HorizontalLine } from "@/components/HorizontalLine";
import InfoCard from "@/components/InfoCard";
import List from "@/components/List";
import Progress from "@/components/Progress";
import Range from "@/components/Range";
import SongInfo from "@/components/SongInfo";
import useDebounce from "@/hooks/useDebounce";
import useHistory from "@/hooks/useHistory";
import useIsConnected from "@/hooks/useIsConnected";
import socket from "@/socket";
import { defaultIconProps } from "@/utils/icon";
import { log } from "@/utils/log";
import { getSetting } from "@/utils/settings";
import { distanceFormatHMS } from "@/utils/utils";
import {
  UilArrowDown,
  UilArrowUp,
  UilBars,
  UilExclamationTriangle,
  UilLink,
  UilLinkBroken,
  UilPause,
  UilPlay,
  UilSync,
  UilVideo,
  UilVolume,
  UilVolumeMute,
} from "@iconscout/react-unicons";
import { intervalToDuration } from "date-fns";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

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

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledRange = styled(Range)`
  width: 100px;
  display: block;
  margin-right: 4px;
  margin-left: 4px;
`;

const Header = styled.header`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  z-index: 20;
`;

const Wrapper = styled.div``;

const ProgressLine = styled.hr<{
  progress: number;
  duration?: number;
  position: "top" | "bottom" | "center" | undefined;
}>`
  position: absolute;
  ${(props) => (props.position === "center" ? `height: auto;` : `height: 1px;`)}
  width: ${(props) => `${props.progress}%`};
  background-color: #7f00ff;
  transition: width ${(props) => (props.duration ? props.duration / 100 : 1)} + "s" linear;
  z-index: 10;
  left: 0;
  ${(props) => props.position === "top" && `top: -1px;`}
  ${(props) => props.position === "bottom" && `bottom: -1px`}
  ${(props) => props.position === "center" && `top: 0; bottom: 0`}
`;

interface Props {
  room: string;
  player: YT.Player;
  // togglePlayerVisibility: () => void;
}

function Player({ room, player }: Props) {
  const [isAvailable, setIsAvailable] = useState<boolean>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState<Duration>({ seconds: 0, minutes: 0 });
  const [current, setCurrent] = useState<Duration>({ seconds: 0, minutes: 0 });
  const [currentSong, setCurrentSong] = useState<CurrentSong | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [history, push] = useHistory<Song>([]);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [volume, setVolume] = useState(() => {
    const vol = Number(localStorage.getItem("42fm:volume")) ?? 50;
    player.setVolume(vol);
    return vol;
  });
  const [isCompact, setIsCompact] = useState(() => {
    return !getSetting("isExpanded");
  });
  const debouncedVolume = useDebounce(volume, 1000);
  const [userCount, setUserCount] = useState(0);
  const isConnected = useIsConnected();

  const getPosition = () => {
    const pos = getSetting("position");
    if (pos === "top" || pos === "bottom" || pos === "center") {
      return pos;
    } else {
      return "top";
    }
  };

  useEffect(() => {
    if (getSetting("autoConnect")) {
      socket.connect();
      socket.emit("joinRoom", { room });
    }

    socket.io.on("reconnect", () => {
      socket.emit("joinRoom", { room });
    });

    function onSongEvent(data: Channel) {
      let prevCurrent: CurrentSong | null = null;
      setCurrentSong((prev) => {
        prevCurrent = prev;
        return data.current;
      });
      if (prevCurrent !== null) {
        push(prevCurrent);
      }
      player.loadVideoById({
        videoId: data.current.yt_id!,
        startSeconds: data.current.duration - data.current.durationRemaining,
      });
      setTotal(
        intervalToDuration({
          start: 1,
          end: data.current.duration * 1000,
        })
      );
      setSongs(data.list);
    }

    function onPlaylistAddEvent(data: Song) {
      setSongs((prev) => [...prev, data]);
    }

    function onPauseEvent() {
      setIsPlaying(false);
      player.pauseVideo();
    }

    function onPlayEvent() {
      log("info", "Player started playing");
      setIsPlaying(true);
      player.playVideo();
    }

    function onClearEvent() {
      player.pauseVideo();
      setTotal({ seconds: 0, minutes: 0 });
      setCurrentSong(null);
      setIsPlaying(false);
      setSongs([]);
    }

    function onSkipEvent(data: Skip) {
      if (data.type === "noplaylist") {
        setTotal({ seconds: 0, minutes: 0 });
        setCurrentSong(null);
        setIsPlaying(false);
      } else if (data.type === "playlist") {
        let prevCurrent: Song | null = null;
        setCurrentSong((prev) => {
          prevCurrent = prev;
          return data.current;
        });
        if (prevCurrent !== null) {
          push(prevCurrent);
        }
        setSongs((prev) => prev.slice(1));
        player.loadVideoById({
          videoId: data.current.yt_id,
        });
      }
    }

    function onNo42fmEvent() {
      setIsAvailable(false);
    }

    function onYes42fmEvent() {
      setIsAvailable(true);
    }

    function onUserCountEvent(count: number) {
      setUserCount(count);
    }

    socket.on("song", onSongEvent);
    socket.on("playlistAdd", onPlaylistAddEvent);
    socket.on("pause", onPauseEvent);
    socket.on("play", onPlayEvent);
    socket.on("clear", onClearEvent);
    socket.on("skip", onSkipEvent);
    socket.on("no42fm", onNo42fmEvent);
    socket.on("yes42fm", onYes42fmEvent);
    socket.on("userCount", onUserCountEvent);

    return () => {
      socket.off("song", onSongEvent);
      socket.off("playlistAdd", onPlaylistAddEvent);
      socket.off("pause", onPauseEvent);
      socket.off("play", onPlayEvent);
      socket.off("clear", onClearEvent);
      socket.off("skip", onSkipEvent);
      socket.off("no42fm", onNo42fmEvent);
      socket.off("yes42fm", onYes42fmEvent);
      socket.off("userCount", onUserCountEvent);
    };
  }, []);

  useEffect(() => {
    function onSongSyncEvent(data: number) {
      if (currentSong) {
        player.seekTo(currentSong?.duration - data, true);
      }
    }

    socket.on("songSync", onSongSyncEvent);

    return () => {
      socket.off("songSync", onSongSyncEvent);
    };
  }, [currentSong]);

  useEffect(() => {
    setTotal(
      intervalToDuration({
        start: 0,
        end: player.getDuration() * 1000,
      })
    );

    const interval = setInterval(() => {
      const newProgress = Math.floor((player.getCurrentTime() / player.getDuration()) * 100);

      setCurrent(
        intervalToDuration({
          start: 1,
          end: Math.floor(player.getCurrentTime()) * 1000,
        })
      );
      setProgress(newProgress);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("42fm:volume", debouncedVolume.toString());
  }, [debouncedVolume]);

  const handleVolumeChange = (event: any) => {
    setVolume(event.target.value);
    player.setVolume(event.target.value);
  };

  const sync = () => {
    socket.emit("sync", { room });
  };

  const connect = () => {
    socket.connect();

    socket.emit("joinRoom", { room });
  };

  const disconnect = () => {
    player.pauseVideo();
    socket.disconnect();
  };

  const mute = () => {
    if (isMuted) {
      player.unMute();
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  };

  const handlePlayerVisibilityChange = () => {
    const oldValue = localStorage.getItem('42fm:hidePlayer');
    const newValue = oldValue === 'true' ? 'false' : 'true';

    localStorage.setItem('42fm:hidePlayer', newValue);
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: '42fm:hidePlayer',
        oldValue: oldValue,
        newValue,
      })
    );
  };

  if (!isConnected) {
    return (
      <Wrapper>
        <Content>
          <InfoCard
            text="Not connected to server"
            right={
              <ButtonIcon
                icon={<UilLink {...defaultIconProps} />}
                onClick={() => connect()}
                tooltip="Connect"
                placement="left"
              />
            }
          />
        </Content>
      </Wrapper>
    );
  }

  if (isAvailable === false) {
    return (
      <Wrapper>
        <Content>
          <InfoCard
            text="42FM is not added on this channel"
            left={<ButtonIcon icon={<UilExclamationTriangle {...defaultIconProps} color="red" />} noInvert />}
          />
        </Content>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Content>
        {isCompact && <ProgressLine progress={progress} duration={currentSong?.duration} position={getPosition()} />}
        {!isCompact &&
          (!currentSong ? (
            <InfoCard text="Type &#34;!fm &lt;link&gt;&#34; to add a song" />
          ) : (
            <>
              <Header>
                <SongInfo
                  title={currentSong?.title}
                  description={currentSong?.artist}
                  image={currentSong?.imgUrl}
                  yt_id={currentSong?.yt_id}
                  username={currentSong?.username}
                />
                <ButtonsWrapper>
                  <ButtonIcon
                    icon={<UilVideo {...defaultIconProps} />}
                    onClick={() => handlePlayerVisibilityChange()}
                    tooltip="Toggle Player"
                    placement="top-end"
                  />
                  <ButtonIcon
                    icon={<UilSync {...defaultIconProps} />}
                    onClick={() => sync()}
                    tooltip="Sync"
                    placement="top-end"
                  />
                  <ButtonIcon
                    icon={<UilLinkBroken {...defaultIconProps} />}
                    onClick={() => disconnect()}
                    tooltip="Disconnect"
                    placement="top-end"
                  />
                </ButtonsWrapper>
              </Header>
              {getSetting("hideProgress") === false && <Progress audioProgress={progress} />}
            </>
          ))}
        <Header>
          <ButtonsWrapper>
            <ButtonIcon
              icon={isPlaying ? <UilPause {...defaultIconProps} /> : <UilPlay {...defaultIconProps} />}
              tooltip={isPlaying ? "Playing" : "Paused"}
              placement="bottom-start"
            />
            <ButtonIcon
              icon={isMuted ? <UilVolumeMute {...defaultIconProps} /> : <UilVolume {...defaultIconProps} />}
              onClick={() => mute()}
              tooltip={isMuted ? "Unmute" : "Mute"}
              placement="bottom-start"
            />
            <StyledRange type="range" name="volume" min={0} max={100} value={volume} onChange={handleVolumeChange} />
            <span style={{ fontVariantNumeric: "tabular-nums" }}>{distanceFormatHMS(current, total)}</span>
          </ButtonsWrapper>
          <ButtonsWrapper>
            <ButtonIcon
              icon={<UilBars {...defaultIconProps} />}
              onClick={() => {
                setIsPlaylistOpen(!isPlaylistOpen);
              }}
              tooltip="Playlist"
              placement="bottom-end"
            />
            <ButtonIcon
              icon={isCompact ? <UilArrowDown {...defaultIconProps} /> : <UilArrowUp {...defaultIconProps} />}
              onClick={() => {
                setIsCompact(!isCompact);
              }}
              tooltip={isCompact ? "Expand" : "Compact"}
              placement="bottom-end"
            />
          </ButtonsWrapper>
        </Header>
      </Content>
      <HorizontalLine />
      {isPlaylistOpen && <List userCount={userCount} history={history} playlist={songs} />}
    </Wrapper>
  );
}

export default Player;
