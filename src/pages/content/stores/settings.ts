import { create } from "zustand";

interface SettingsState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useSettingsState = create<SettingsState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set((_state) => ({ isOpen })),
}));
