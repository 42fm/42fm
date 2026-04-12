import { SectionContainer, SectionLabel, SectionsContainer } from "@/styles/settings";
import React, { ChangeEvent } from "react";
import Select from "../Select";
import { SectionInputReset } from "./Common";

function SettingsGeneral({
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
        <SectionLabel>Progress bar position in compact mode</SectionLabel>
        <SectionInputReset settingsKey="position" handleReset={handleReset} nonDefaultSettings={nonDefaultSettings}>
          <Select name="position" value={settings["position"]} onChange={handleChange}>
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
            <option value="center">Center</option>
          </Select>
        </SectionInputReset>
      </SectionContainer>
    </SectionsContainer>
  );
}

export default SettingsGeneral;
