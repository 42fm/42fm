import React, { ChangeEvent, useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import Image from "./Image";
import Select from "./Select";
import SettingsGeneral from "./SettingsGeneral";
import { default_settings, getSettings } from "../utils/settings";
import SettingsBehaviour from "./SettingBehaviour";
import SettingsChat from "./SettingsChat";
import icons from "@/icons";
import logo from "../assets/logo-32.png";
import getAsset from "@/utils/getAsset";
import browser from "webextension-polyfill";

const Wrapper = styled.div`
  width: 700px;
  height: 400px;
  background: ${(props) => props.theme.color.primary};
  border-radius: 16px;
  display: flex;
  overflow: hidden;
`;

const SidePanel = styled.div`
  width: 180px;
  background: ${(props) => props.theme.color.secondary};
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Tab = styled.span`
  width: 100%;
  padding: 8px 16px;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  :hover {
    background: ${(props) => props.theme.color.outline};
  }
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
`;

const Horizontal = styled(Section)`
  flex-direction: row;
  gap: 16px;
`;

const SectionLeft = styled(Section)`
  align-items: start;
`;

const Container = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  padding: 16px;
  flex-direction: column;
  gap: 16px;
`;

function Settings() {
  const [tab, setTab] = useState(0);
  const [settings, setSettings] = useState(() => {
    return getSettings();
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = event.target;
    const name = target.name;
    //@ts-ignore
    const value = target.type === "checkbox" ? target.checked : target.value;

    setSettings({
      ...settings,
      [name]: value,
    });
    localStorage.setItem(`42FM:settings:${name}`, value.toString());
  };

  const handleClick = (tab: number) => {
    setTab(tab);
  };

  const tabs = [
    {
      name: "general",
      label: "General",
      element: (
        <SettingsGeneral handleChange={handleChange} settings={settings} />
      ),
    },
    {
      name: "behaviour",
      label: "Behaviour",
      element: (
        <SettingsBehaviour handleChange={handleChange} settings={settings} />
      ),
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
          <Image src={getAsset("logo-32.png")} />
        </SectionLeft>
        <Section>
          {tabs.map((tab, index) => (
            <Tab key={tab.name} onClick={() => handleClick(index)}>
              {tab.label}
            </Tab>
          ))}
        </Section>
        <Horizontal>
          <ButtonIcon
            icon={icons.github}
            onClick={() => window.open("https://github.com/42fm", "_blank")}
          />
          {/* <ButtonIcon icon={icons.paypal} /> */}
          {/* <ButtonIcon icon={icons.twitter} /> */}
          {/* <ButtonIcon icon="../assets/github.svg" />
          <ButtonIcon icon="../assets/github.svg" />
          <ButtonIcon icon="../assets/github.svg" /> */}
        </Horizontal>
        Version: {browser.runtime.getManifest().version}
      </SidePanel>
      <Container>{tabs[tab].element}</Container>
    </Wrapper>
  );
}

export default Settings;
