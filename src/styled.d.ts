import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      primary: string;
      secondary: string;
      outline: string;
      twitch: string;
      input: string;
      hover: string;
    };
    text: {
      primary: string;
      secondary: string;
    };
  }
}
