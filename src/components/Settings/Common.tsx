import { SectionInputs } from "@/styles/settings";
import { UilRedo } from "@iconscout/react-unicons";
import React from "react";
import ButtonIcon from "../ButtonIcon";

interface Props {
  isSet: boolean;
  handleReset: () => void;
  children: React.ReactNode;
}

export function SectionInputReset({ isSet, handleReset, children }: Props) {
  return (
    <SectionInputs>
      {isSet && <ButtonIcon tooltip="Reset to default" icon={<UilRedo />} onClick={handleReset} placement="left" />}
      {children}
    </SectionInputs>
  );
}
