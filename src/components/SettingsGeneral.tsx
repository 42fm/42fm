import React, { ChangeEvent } from "react";
import styled, { css } from "styled-components";
import Select from "./Select";

const mb8 = css`
  margin-bottom: 8px;
`;

const mb16 = css`
  margin-bottom: 16px;
`;

const Spacing = styled.div`
  height: 16px;
`;

const Title = styled.h4`
  ${() => mb16};
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

function SettingsGeneral({
  settings,
  handleChange,
}: {
  settings: any;
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}) {
  return (
    <div>
      <Title>Progress bar position in compact mode</Title>
      <Select name="position" value={settings["position"]} onChange={handleChange}>
        <option value="top">Top</option>
        <option value="bottom">Bottom</option>
        <option value="center">Center</option>
      </Select>
    </div>
  );
}

export default SettingsGeneral;
