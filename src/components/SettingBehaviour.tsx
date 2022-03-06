import React, { ChangeEvent } from "react";
import styled, { css } from "styled-components";
import Checkbox from "./Checkbox";

const mb16 = css`
  margin-bottom: 16px;
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

function SettingsBehaviour({
  settings,
  handleChange,
}: {
  settings: any;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}) {
  return (
    <div>
      <Title>Behaviour</Title>
      <CheckboxWrapper>
        <Checkbox
          type="checkbox"
          name="autoconnect"
          checked={settings["autoconnect"]}
          onChange={handleChange}
          label="Connect automatically"
        />
        <Checkbox
          type="checkbox"
          name="isExpanded"
          checked={settings["isExpanded"]}
          onChange={handleChange}
          label="Start in expanded mode"
        />
        <Checkbox
          type="checkbox"
          name="hideLeaderboard"
          checked={settings["hideLeaderboard"]}
          onChange={handleChange}
          label="Hide chat leaderboard"
        />
      </CheckboxWrapper>
    </div>
  );
}

export default SettingsBehaviour;
