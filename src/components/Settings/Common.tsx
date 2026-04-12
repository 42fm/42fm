import { SectionInputs } from "@/styles/settings";
import { defaultIconProps } from "@/utils/icon";
import { default_settings } from "@/utils/settings";
import { UilRedo } from "@iconscout/react-unicons";
import React from "react";
import ButtonIcon from "../ButtonIcon";

interface Props {
  settingsKey: string;
  nonDefaultSettings: Set<string>;
  handleReset: (key: string) => void;
  children: React.ReactNode;
}

export function SectionInputReset({ settingsKey, nonDefaultSettings, handleReset, children }: Props) {
  return (
    <SectionInputs>
      {default_settings[settingsKey] != undefined && nonDefaultSettings.has(settingsKey) && (
        <ButtonIcon
          tooltip="Reset to default"
          icon={<UilRedo {...defaultIconProps} />}
          onClick={() => handleReset(settingsKey)}
          placement="left"
        />
      )}
      {children}
    </SectionInputs>
  );
}
