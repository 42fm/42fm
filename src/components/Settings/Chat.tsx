import { SectionContainer, SectionLabel, SectionsContainer } from "@/styles/settings";
import React, { ChangeEvent } from "react";
import Toggle from "../Toggle";
import { SectionInputReset } from "./Common";

function SettingsChat({
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
        <SectionLabel>Disable badges</SectionLabel>
        <SectionInputReset settingsKey="disableBadges" handleReset={handleReset} nonDefaultSettings={nonDefaultSettings}>
          <Toggle name="disableBadges" checked={settings["disableBadges"]} onChange={handleChange} />
        </SectionInputReset>
      </SectionContainer>
      <SectionContainer>
        <SectionLabel>Disable paints</SectionLabel>
        <SectionInputReset settingsKey="disablePaints" handleReset={handleReset} nonDefaultSettings={nonDefaultSettings}>
          <Toggle name="disablePaints" checked={settings["disablePaints"]} onChange={handleChange} />
        </SectionInputReset>
      </SectionContainer>
    </SectionsContainer>
  );
}

export default SettingsChat;
