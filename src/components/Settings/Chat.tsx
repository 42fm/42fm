import { SectionContainer, SectionLabel, SectionsContainer } from "@/styles/settings";
import React from "react";
import Toggle from "../Toggle";
import { SectionInputReset } from "./Common";
import { default_settings, useSettingsStore } from "@/pages/content/stores/settings";
import { useShallow } from "zustand/shallow";

function SettingsChat() {
  const setSetting = useSettingsStore((state) => state.setSetting);
  const removeSetting = useSettingsStore((state) => state.removeSetting);
  const disableBadges = useSettingsStore(
    useShallow((state) => ({
      value: state.disableBadges ?? default_settings.disableBadges,
      isDefault: state.disableBadges !== undefined,
    })),
  );
  const disablePaints = useSettingsStore(
    useShallow((state) => ({
      value: state.disablePaints ?? default_settings.disablePaints,
      isDefault: state.disablePaints !== undefined,
    })),
  );

  return (
    <SectionsContainer>
      <SectionContainer>
        <SectionLabel>Hide badges</SectionLabel>
        <SectionInputReset handleReset={() => removeSetting("disableBadges")} isSet={disableBadges.isDefault}>
          <Toggle
            name="disableBadges"
            checked={disableBadges.value}
            onChange={(e) => setSetting("disableBadges", e.target.checked)}
          />
        </SectionInputReset>
      </SectionContainer>
      <SectionContainer>
        <SectionLabel>Hide paints</SectionLabel>
        <SectionInputReset handleReset={() => removeSetting("disablePaints")} isSet={disablePaints.isDefault}>
          <Toggle
            name="disablePaints"
            checked={disablePaints.value}
            onChange={(e) => setSetting("disablePaints", e.target.checked)}
          />
        </SectionInputReset>
      </SectionContainer>
    </SectionsContainer>
  );
}

export default SettingsChat;
