import { create } from "zustand";

interface PlayerState {
  isOpen: boolean;
  isAvailable: boolean | undefined;
  isPlaying: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsAvailable: (isAvailable: boolean | undefined) => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

export const usePlayerState = create<PlayerState>((set) => ({
  isOpen: false,
  isAvailable: undefined,
  isPlaying: false,
  setIsOpen: (isOpen) => set(() => ({ isOpen })),
  setIsAvailable: (isAvailable) => set(() => ({ isAvailable })),
  setIsPlaying: (isPlaying) => set(() => ({ isPlaying })),
}));
