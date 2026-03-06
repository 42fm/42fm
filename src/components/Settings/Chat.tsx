import { SectionContainer, SectionLabel, SectionsContainer } from "@/styles/settings";
import React, { ChangeEvent } from "react";
import Toggle from "../Toggle";

function SettingsChat({
  settings,
  handleChange,
}: {
  settings: any;
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}) {
  return (
    <SectionsContainer>
      <SectionContainer>
        <SectionLabel>Disable badges</SectionLabel>
        <Toggle name="disableBadges" checked={settings["disableBadges"]} onChange={handleChange} />
      </SectionContainer>
      <SectionContainer>
        <SectionLabel>Disable paints</SectionLabel>
        <Toggle name="disablePaints" checked={settings["disablePaints"]} onChange={handleChange} />
      </SectionContainer>
    </SectionsContainer>
  );
}

export default SettingsChat;
