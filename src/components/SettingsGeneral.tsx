import { SectionContainer, SectionLabel, SectionsContainer } from "@/styles/settings";
import React, { ChangeEvent } from "react";
import Select from "./Select";

function SettingsGeneral({
  settings,
  handleChange,
}: {
  settings: any;
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}) {
  return (
    <SectionsContainer>
      <SectionContainer>
        <SectionLabel>Progress bar position in compact mode</SectionLabel>
        <Select name="position" value={settings["position"]} onChange={handleChange}>
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
          <option value="center">Center</option>
        </Select>
      </SectionContainer>
    </SectionsContainer>
  );
}

export default SettingsGeneral;
