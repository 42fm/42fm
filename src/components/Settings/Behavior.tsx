import { SectionContainer, SectionLabel, SectionsContainer } from "@/styles/settings";
import React, { ChangeEvent } from "react";
import Toggle from "../Toggle";

function SettingsBehavior({
  settings,
  handleChange,
}: {
  settings: any;
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}) {
  return (
    <SectionsContainer>
      <SectionContainer>
        <SectionLabel>Connect automatically</SectionLabel>
        <Toggle name="autoConnect" checked={settings["autoConnect"]} onChange={handleChange} />
      </SectionContainer>
      <SectionContainer>
        <SectionLabel>Start in expanded mode</SectionLabel>
        <Toggle name="isExpanded" checked={settings["isExpanded"]} onChange={handleChange} />
      </SectionContainer>
      <SectionContainer>
        <SectionLabel>Hide chat leaderboard</SectionLabel>
        <Toggle name="hideLeaderboard" checked={settings["hideLeaderboard"]} onChange={handleChange} />
      </SectionContainer>
      <SectionContainer>
        <SectionLabel>Hide player progress bar</SectionLabel>
        <Toggle name="hideProgress" checked={settings["hideProgress"]} onChange={handleChange} />
      </SectionContainer>
    </SectionsContainer>
  );
}

export default SettingsBehavior;
