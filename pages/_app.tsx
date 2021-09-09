import type {AppProps} from 'next/app';
import {createGlobalStyle, ThemeProvider} from 'styled-components';
import 'antd/dist/antd.css';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: 'Inter';
  }
`;

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
