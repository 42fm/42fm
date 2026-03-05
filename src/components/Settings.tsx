import { defaultIconProps } from "@/utils/icon";
import { UilGithub } from "@iconscout/react-unicons";
import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import logo32 from "../assets/logo-32.png";
import { getSettings, setSetting } from "../utils/settings";
import ButtonIcon from "./ButtonIcon";
import Image from "./Image";
import SettingsBehavior from "./SettingBehavior";
import SettingsChat from "./SettingsChat";
import SettingsGeneral from "./SettingsGeneral";

const Wrapper = styled.div`
  width: 700px;
  height: 400px;
  background: ${(props) => props.theme.color.primary};
  border-radius: 16px;
  display: flex;
  overflow: hidden;
`;

const SidePanel = styled.div`
  min-width: 200px;
  background: ${(props) => props.theme.color.secondary};
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Tab = styled.span<{ isSelected: boolean }>`
  width: 100%;
  padding: 8px 16px;
  border-radius: 8px;
  box-sizing: border-box;
  cursor: pointer;
  transition: background 150ms ease-in-out;
  &:hover {
    background: ${(props) => props.theme.color.hover};
  }
  background: ${(props) => (props.isSelected ? props.theme.color.primary : "transparent")};
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4px;
`;

const Horizontal = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SectionLeft = styled(Section)`
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  padding: 16px;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const Info = styled.span`
  font-size: 10px;
  opacity: 0.8;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
`;

function Settings() {
  const [tabIndex, setTabIndex] = useState(0);
  const [settings, setSettings] = useState(() => {
    return getSettings();
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = event.target;
    const name = target.name;
    //@ts-ignore
    const value = target.type === "checkbox" ? target.checked : target.value;

    setSettings({
      ...settings,
      [name]: value,
    });

    setSetting(name, value.toString());
  };

  const handleClick = (tabIndex: number) => {
    setTabIndex(tabIndex);
  };

  const tabs = [
    {
      name: "general",
      label: "General",
      element: <SettingsGeneral handleChange={handleChange} settings={settings} />,
    },
    {
      name: "behavior",
      label: "Behavior",
      element: <SettingsBehavior handleChange={handleChange} settings={settings} />,
    },
    {
      name: "chat",
      label: "Chat",
      element: <SettingsChat handleChange={handleChange} settings={settings} />,
    },
  ];

  return (
    <Wrapper>
      <SidePanel>
        <SectionLeft>
          <Image src={logo32} />
        </SectionLeft>
        <Section>
          {tabs.map((tab, index) => (
            <Tab key={tab.name} onClick={() => handleClick(index)} isSelected={tabIndex === index}>
              {tab.label}
            </Tab>
          ))}
        </Section>
        <Horizontal>
          <InfoWrapper>
            <Info>Version: {process.env.APP_VERSION}</Info>
            <Info>Commit: {process.env.GIT_COMMIT}</Info>
          </InfoWrapper>
          <ButtonIcon
            tooltip="Github"
            icon={<UilGithub {...defaultIconProps} />}
            onClick={() => window.open("https://github.com/42fm", "_blank")}
          />
        </Horizontal>
      </SidePanel>
      <Container>{tabs[tabIndex].element}</Container>
    </Wrapper>
  );
}

export default Settings;
