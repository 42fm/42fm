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

function SettingsChat({
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
      <Title>Chat</Title>
      <CheckboxWrapper>
        <Checkbox
          type="checkbox"
          name="disableBadges"
          checked={settings["disableBadges"]}
          onChange={handleChange}
          label="Disable badges"
        />
        <Checkbox
          type="checkbox"
          name="disablePaints"
          checked={settings["disablePaints"]}
          onChange={handleChange}
          label="Disable paints"
        />
      </CheckboxWrapper>
    </div>
  );
}

export default SettingsChat;
