import { SectionContainer, SectionLabel, SectionsContainer } from "@/styles/settings";
import React from "react";
import Select from "../Select";
import { SectionInputReset } from "./Common";
import { default_settings, useSettingsStore } from "@/pages/content/stores/settings";
import { useShallow } from "zustand/react/shallow";

function SettingsGeneral() {
  const setSetting = useSettingsStore((state) => state.setSetting);
  const removeSetting = useSettingsStore((state) => state.removeSetting);
  const position = useSettingsStore(
    useShallow((state) => ({
      value: state.position ?? default_settings.position,
      isDefault: state.position !== undefined,
    })),
  );

  return (
    <SectionsContainer>
      <SectionContainer>
        <SectionLabel>Progress bar position in compact mode</SectionLabel>
        <SectionInputReset handleReset={() => removeSetting("position")} isSet={position.isDefault}>
          <Select
            name="position"
            value={position.value}
            onChange={(e) => setSetting("position", e.target.value as "top" | "bottom" | "center")}
          >
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
