import { create } from "zustand";

interface YoutubePlayerState {
  player?: YT.Player;
  setPlayer: (player: YT.Player) => void;
}

export const useYoutubePlayerStore = create<YoutubePlayerState>((set) => ({
  player: undefined,
  setPlayer: (player) => set((_state) => ({ player: player })),
}));
