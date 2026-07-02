import { css, createGlobalStyle, createTheme } from "styled-components";

const theme = createTheme({
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
    text: "#efeff1",
  },
  text: {
    primary: "#0e0e10",
    secondary: "#ADADB8",
  },
});

const { vars } = theme;

const lightVars = css`
  ${vars.color.primary}: #eeeeee;
  ${vars.color.secondary}: #ffffff;
  ${vars.color.outline}: #e5e5e5;
  ${vars.color.twitch}: #9146FF;
  ${vars.color.input}: #ffffff;
  ${vars.color.hover}: #ffffff;
  ${vars.color.iconHover}: #eeeeee;
  ${vars.tooltip.background}: #0e0e10;
  ${vars.tooltip.text}: #efeff1;
  ${vars.text.primary}: #0e0e10;
  ${vars.text.secondary}: #ADADB8;
`;

const darkVars = css`
  ${vars.color.primary}: #18181B;
  ${vars.color.secondary}: #0E0E10;
  ${vars.color.outline}: #303032;
  ${vars.color.twitch}: #9146FF;
  ${vars.color.input}: #3E3E40;
  ${vars.color.hover}: #2C2C2E;
  ${vars.color.iconHover}: #2C2C2E;
  ${vars.tooltip.background}: #ffffff;
  ${vars.tooltip.text}: #000000;
  ${vars.text.primary}: #FFFFFF;
  ${vars.text.secondary}: #ADADB8;
`;

const DarkOverrides = createGlobalStyle`
  :host {
    ${lightVars}
  }
  @media (prefers-color-scheme: dark) {
    :host {
      ${darkVars}
    }
  }
`;

export { theme, vars, DarkOverrides };
