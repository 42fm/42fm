import { SectionContainer, SectionLabel, SectionsContainer } from "@/styles/settings";
import React, { ChangeEvent } from "react";
import Toggle from "../Toggle";
import { SectionInputReset } from "./Common";

function SettingsBehavior({
  settings,
  nonDefaultSettings,
  handleChange,
  handleReset,
}: {
  settings: any;
  nonDefaultSettings: Set<string>;
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleReset: (key: string) => void;
}) {
  return (
    <SectionsContainer>
      <SectionContainer>
        <SectionLabel>Connect automatically</SectionLabel>
        <SectionInputReset settingsKey="autoConnect" handleReset={handleReset} nonDefaultSettings={nonDefaultSettings}>
          <Toggle name="autoConnect" checked={settings["autoConnect"]} onChange={handleChange} />
        </SectionInputReset>
      </SectionContainer>
      <SectionContainer>
        <SectionLabel>Start in expanded mode</SectionLabel>
        <SectionInputReset settingsKey="isExpanded" handleReset={handleReset} nonDefaultSettings={nonDefaultSettings}>
          <Toggle name="isExpanded" checked={settings["isExpanded"]} onChange={handleChange} />
        </SectionInputReset>
      </SectionContainer>
      <SectionContainer>
        <SectionLabel>Hide chat leaderboard</SectionLabel>
        <SectionInputReset settingsKey="hideLeaderboard" handleReset={handleReset} nonDefaultSettings={nonDefaultSettings}>
          <Toggle name="hideLeaderboard" checked={settings["hideLeaderboard"]} onChange={handleChange} />
        </SectionInputReset>
      </SectionContainer>
      <SectionContainer>
        <SectionLabel>Hide player progress bar</SectionLabel>
        <SectionInputReset settingsKey="hideProgress" handleReset={handleReset} nonDefaultSettings={nonDefaultSettings}>
          <Toggle name="hideProgress" checked={settings["hideProgress"]} onChange={handleChange} />
        </SectionInputReset>
      </SectionContainer>
    </SectionsContainer>
  );
}

export default SettingsBehavior;
