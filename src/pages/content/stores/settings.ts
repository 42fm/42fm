import { create } from "zustand";
import { createJSONStorage } from "zustand/middleware";
import { persist } from "zustand/middleware";

interface SettingsState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useSettingsState = create<SettingsState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set(() => ({ isOpen })),
}));

export interface SettingsWithActions extends SettingsValuesPartial {
  setSetting: <T extends keyof SettingsValues>(key: T, value: SettingsValues[T]) => void;
  removeSetting: <T extends keyof SettingsValues>(key: T) => void;
}

type SettingsValuesPartial = Partial<SettingsValues>;

export interface SettingsValues {
  position: "top" | "center" | "bottom";
  autoConnect: boolean;
  isExpanded: boolean;
  hideLeaderboard: boolean;
  disableBadges: boolean;
  disablePaints: boolean;
  hideProgress: boolean;
}

export const default_settings: SettingsValues = {
  position: "top",
  autoConnect: true,
  isExpanded: false,
  hideLeaderboard: true,
  disableBadges: false,
  disablePaints: false,
  hideProgress: true,
};

export const useSettingsStore = create<SettingsWithActions>()(
  persist(
    (set) => ({
      setSetting: (key, value) => set(() => ({ [key]: value })),
      removeSetting: (key) => set(() => ({ [key]: undefined })),
    }),
    {
      name: "42fm:settings",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
