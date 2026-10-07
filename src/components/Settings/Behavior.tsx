import { SectionContainer, SectionLabel, SectionsContainer } from "@/styles/settings";
import React from "react";
import Toggle from "../Toggle";
import { SectionInputReset } from "./Common";
import { default_settings, useSettingsStore } from "@/pages/content/stores/settings";
import { useShallow } from "zustand/shallow";

function SettingsBehavior() {
  const setSetting = useSettingsStore((state) => state.setSetting);
  const removeSetting = useSettingsStore((state) => state.removeSetting);
  const autoConnect = useSettingsStore(
    useShallow((state) => ({
      value: state.autoConnect ?? default_settings.autoConnect,
      isDefault: state.autoConnect !== undefined,
    })),
  );
  const isExpanded = useSettingsStore(
    useShallow((state) => ({
      value: state.isExpanded ?? default_settings.isExpanded,
      isDefault: state.isExpanded !== undefined,
    })),
  );
  const hideLeaderboard = useSettingsStore(
    useShallow((state) => ({
      value: state.hideLeaderboard ?? default_settings.hideLeaderboard,
      isDefault: state.hideLeaderboard !== undefined,
    })),
  );
  const hideProgress = useSettingsStore(
    useShallow((state) => ({
      value: state.hideProgress ?? default_settings.hideProgress,
      isDefault: state.hideProgress !== undefined,
    })),
  );

  return (
    <SectionsContainer>
      <SectionContainer>
        <SectionLabel>Connect automatically</SectionLabel>
        <SectionInputReset handleReset={() => removeSetting("autoConnect")} isSet={autoConnect.isDefault}>
          <Toggle
            name="autoConnect"
            checked={autoConnect.value}
            onChange={(e) => setSetting("autoConnect", e.target.checked)}
          />
        </SectionInputReset>
      </SectionContainer>
      <SectionContainer>
        <SectionLabel>Start in expanded mode</SectionLabel>
        <SectionInputReset handleReset={() => removeSetting("isExpanded")} isSet={isExpanded.isDefault}>
          <Toggle
            name="isExpanded"
            checked={isExpanded.value}
            onChange={(e) => setSetting("isExpanded", e.target.checked)}
          />
        </SectionInputReset>
      </SectionContainer>
      <SectionContainer>
        <SectionLabel>Hide chat leaderboard</SectionLabel>
        <SectionInputReset handleReset={() => removeSetting("hideLeaderboard")} isSet={hideLeaderboard.isDefault}>
          <Toggle
            name="hideLeaderboard"
            checked={hideLeaderboard.value}
            onChange={(e) => setSetting("hideLeaderboard", e.target.checked)}
          />
        </SectionInputReset>
      </SectionContainer>
      <SectionContainer>
        <SectionLabel>Hide player progress bar</SectionLabel>
        <SectionInputReset handleReset={() => removeSetting("hideProgress")} isSet={hideProgress.isDefault}>
          <Toggle
            name="hideProgress"
            checked={hideProgress.value}
            onChange={(e) => setSetting("hideProgress", e.target.checked)}
          />
        </SectionInputReset>
      </SectionContainer>
    </SectionsContainer>
  );
}

export default SettingsBehavior;
