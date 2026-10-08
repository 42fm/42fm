import { SetStateAction } from "react";
import { create } from "zustand";

interface YoutubePlayerState {
  player?: YT.Player;
  isOpen: boolean;
  setPlayer: (player: YT.Player) => void;
  setIsOpen: (isOpen: SetStateAction<boolean>) => void;
}

export const useYoutubePlayerStore = create<YoutubePlayerState>((set) => ({
  player: undefined,
  isOpen: false,
  setPlayer: (player) => set(() => ({ player })),
  setIsOpen: (isOpen) => set((state) => ({ isOpen: typeof isOpen === "function" ? isOpen(state.isOpen) : isOpen })),
}));
