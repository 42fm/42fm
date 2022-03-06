import React from "react";
import ReactDOM from "react-dom";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Button from "../../components/Button";
import { theme } from "../../theme";
import icons from "../../icons";

declare var browser: any;

const root = document.getElementById("root");

const Wrapper = styled.div`
  color: black;
  background: ${(props) => props.theme.color.primary};
  button {
    padding: 16px 16px;
  }
`;

const GlobalStyle = createGlobalStyle`
  body{
    background: ${(props) => props.theme.color.primary};
    min-width: 256px;
    font-family: "Lato", sans-serif;
    color: white;
    margin: 24px 16px;
  }
`;

const openNewWindow = () => {
  const URL = process.env.TWITCH_CALLBACK;
  const CLIENT_ID = process.env.CLIENT_ID;
  window.open(
    `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${URL}&scope=user:read:email`,
    "Twitch Login",
    "popup"
  );
};

const ButtonWithMargin = styled(Button)`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const Text = styled.span`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
`;

const GlitchWrapper = styled.div`
  width: 24px;
  height: 24px;
  overflow: visible;
`;

const App = () => {
  return (
    <Wrapper>
      <Text>Welcome to 42FM</Text>
      <ButtonWithMargin fullWidth onClick={() => openNewWindow()}>
        <GlitchWrapper>
          <img src={icons.glitch} alt="Glitch" width="24px" height="28px" />
        </GlitchWrapper>
        Add 42FM to channel
      </ButtonWithMargin>
    </Wrapper>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  root
);
