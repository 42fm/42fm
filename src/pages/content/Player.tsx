import ButtonIcon from "@/components/ButtonIcon";
import { HorizontalLine } from "@/components/HorizontalLine";
import InfoCard from "@/components/InfoCard";
import List from "@/components/List";
import Progress from "@/components/Progress";
import Range from "@/components/Range";
import SongInfo from "@/components/SongInfo";
import useDebounce from "@/hooks/useDebounce";
import useHistory from "@/hooks/useHistory";
import icons from "@/icons";
import socket from "@/socket";
import { log } from "@/utils/log";
import { getSetting } from "@/utils/settings";
import { distanceFormatHMS } from "@/utils/utils";
import { CurrentSong, Song } from "@typings/index";
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
  gap: 8px;
`;

const StyledRange = styled(Range)`
  width: 100px;
  display: block;
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
  transition: width ${(props) => (props.duration ? props.duration / 100 : 1)}+ "s" linear;
  z-index: 10;
  left: 0;
  ${(props) => props.position === "top" && `top: -1px;`}
  ${(props) => props.position === "bottom" && `bottom: -1px`}
  ${(props) => props.position === "center" && `top: 0; bottom: 0`}
`;

const audio = new Audio();

function Popup({ room }: { room: string }) {
  const [isAvailable, setIsAvailable] = useState<boolean>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState<Duration>({ seconds: 0, minutes: 0 });
  const [current, setCurrent] = useState<Duration>({ seconds: 0, minutes: 0 });
  const [currentSong, setCurrentSong] = useState<CurrentSong | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [history, push] = useHistory<Song>([]);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [volume, setVolume] = useState(() => {
    return Number(localStorage.getItem("42FM:volume")) ?? 50;
  });
  const [isCompact, setIsCompact] = useState(() => {
    return getSetting("isExpanded") ? true : false;
  });
  const debouncedVolume = useDebounce(volume, 1000);

  const getPosition = () => {
    const pos = getSetting("position");
    if (pos === "top" || pos === "bottom" || pos === "center") {
      return pos;
    } else {
      return "top";
    }
  };

  useEffect(() => {
    socket.emit("joinRoom", { room });

    socket.on("song", (data) => {
      audio.src = data.current.url;
      let prevCurrent: CurrentSong | null = null;
      setCurrentSong((prev) => {
        prevCurrent = prev;
        return data.current;
      });
      if (prevCurrent !== null) {
        push(prevCurrent);
      }
      setSongs(data.list);
    });

    socket.on("playlistAdd", (data) => {
      setSongs((prev) => [...prev, data]);
    });

    socket.on("pause", () => {
      audio.pause();
      setIsPlaying(false);
    });

    socket.on("play", () => {
      audio.play().then(() => {
        log("info", `Player started playing`);
        setIsPlaying(true);
      });
    });

    socket.on("clear", () => {
      audio.pause();
      audio.src = "";
      setTotal({ seconds: 0, minutes: 0 });
      setCurrentSong(null);
      setIsPlaying(false);
      setSongs([]);
    });

    socket.on("skip", (data) => {
      if (data.type === "noplaylist") {
        audio.src = "";
        setTotal({ seconds: 0, minutes: 0 });
        setCurrentSong(null);
        setIsPlaying(false);
      } else if (data.type === "playlist") {
        audio.src = data.current.url;
        let prevCurrent: Song | null = null;
        setCurrentSong((prev) => {
          prevCurrent = prev;
          return data.current;
        });
        if (prevCurrent !== null) {
          push(prevCurrent);
        }
        setSongs((prev) => prev.slice(1));
      }
    });

    socket.io.on("reconnect", () => {
      socket.emit("joinRoom", { room });
    });

    socket.on("no42fm", () => {
      setIsAvailable(false);
    });

    // not used but may be useful in the future
    socket.on("yes42fm", () => {
      setIsAvailable(true);
    });

    audio.addEventListener("play", () => {
      socket.emit("sync", { room });
    });

    return () => {
      audio.pause();
      audio.remove();
    };
  }, []);

  const playthrough = () => {
    if (currentSong?.isPlaying) {
      audio.play().then(() => {
        log("info", `Player can play and started playing`);
        setIsPlaying(true);
      });
    } else {
      log("info", `Player can play but is paused`);
    }
  };

  useEffect(() => {
    audio.addEventListener("canplaythrough", playthrough);
    return () => {
      audio.removeEventListener("canplaythrough", playthrough);
    };
  }, [currentSong]);

  useEffect(() => {
    socket.on("songSync", function (data) {
      if (currentSong) {
        audio.currentTime = currentSong?.duration - data;
      }
    });
  }, [currentSong]);

  useEffect(() => {
    audio.addEventListener("loadedmetadata", () => {
      setTotal(intervalToDuration({ start: 0, end: Math.floor(audio.duration) * 1000 }));
    });

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
    });

    const interval = setInterval(() => {
      const newProgress = Math.floor((audio.currentTime / audio.duration) * 100);
      setCurrent(
        intervalToDuration({
          start: 0,
          end: Math.floor(audio.currentTime) * 1000,
        })
      );
      setProgress(newProgress);
    }, 1000);

    return () => clearInterval(interval);
  }, [audio]);

  useEffect(() => {
    audio.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    localStorage.setItem("42FM:volume", debouncedVolume.toString());
  }, [debouncedVolume]);

  const handleVolumeChange = (event: any) => {
    setVolume(event.target.value);
  };

  const sync = () => {
    socket.emit("sync", { room });
  };

  const connect = () => {
    socket.connect();
  };

  const disconnect = () => {
    audio.pause();
    socket.disconnect();
  };

  const mute = () => {
    audio.muted = !audio.muted;
  };

  if (isAvailable === false) {
    return (
      <Wrapper>
        <Content>
          <InfoCard text="42FM is not added on this channel" left={<ButtonIcon icon={icons.warning} />} />
        </Content>
      </Wrapper>
    );
  }

  if (!socket.connected) {
    return (
      <Wrapper>
        <Content>
          <InfoCard
            text="Not conected"
            right={<ButtonIcon icon={icons.connect} onClick={() => connect()} tooltip={"Connect"} placement="left" />}
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
                  <ButtonIcon icon={icons.reload} onClick={() => sync()} tooltip="Sync" placement="top-end" />
                  <ButtonIcon
                    icon={icons.disconnect}
                    onClick={() => disconnect()}
                    tooltip="Disconnect"
                    placement="top-end"
                  />
                </ButtonsWrapper>
              </Header>
              <Progress audioProgress={progress} />
            </>
          ))}
        <Header>
          <ButtonsWrapper>
            <ButtonIcon
              icon={isPlaying ? icons.pause : icons.play}
              tooltip={isPlaying ? "Playing" : "Paused"}
              placement="bottom-start"
            />
            <ButtonIcon
              icon={audio.muted ? icons.volumeMuted : icons.volumeMedium}
              onClick={() => mute()}
              tooltip={audio.muted ? "Unmute" : "Mute"}
              placement="bottom-start"
            />
            <StyledRange type="range" name="volume" min={0} max={100} value={volume} onChange={handleVolumeChange} />
            <span>{distanceFormatHMS(current, total)}</span>
          </ButtonsWrapper>
          <ButtonsWrapper>
            <ButtonIcon
              icon={icons.list}
              onClick={() => {
                setIsPlaylistOpen(!isPlaylistOpen);
              }}
              tooltip="Playlist"
              placement="bottom-end"
            />
            <ButtonIcon
              icon={isCompact ? icons.expand : icons.compact}
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
      {isPlaylistOpen && <List history={history} playlist={songs} />}
    </Wrapper>
  );
}

export default Popup;
