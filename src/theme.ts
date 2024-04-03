import { DefaultTheme } from "styled-components";

const darkMode: DefaultTheme = {
  color: {
    primary: "#18181B",
    secondary: "#0E0E10",
    outline: "#303032",
    twitch: "#9146FF",
    input: "#3E3E40",
    hover: "#5E5E60",
    iconHover: "#2C2C2E",
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
  text: {
    primary: "#000000",
    secondary: "#ADADB8",
  },
};

export { darkMode, lightMode };
