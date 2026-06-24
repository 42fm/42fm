import { DefaultTheme } from "styled-components";

const darkMode: DefaultTheme = {
  color: {
    primary: "#18181B",
    secondary: "#0E0E10",
    outline: "#303032",
    twitch: "#9146FF",
    input: "#3E3E40",
    hover: "#2C2C2E",
    iconHover: "#2C2C2E",
  },
  tooltip: {
    background: "#FFFFFF",
    text: "#000000",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#ADADB8",
  },
};

const lightMode: DefaultTheme = {
  color: {
    primary: "#eeeeee",
    secondary: "#ffffff",
    outline: "#e5e5e5",
    twitch: "#9146FF",
    input: "#ffffff",
    hover: "#ffffff",
    iconHover: "#eeeeee",
  },
  tooltip: {
    background: "#0e0e10",
    text: "#ffffff",
  },
  text: {
    primary: "#0e0e10",
    secondary: "#ADADB8",
  },
};

export { darkMode, lightMode };
