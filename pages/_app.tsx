import type {AppProps} from 'next/app';
import {createGlobalStyle, ThemeProvider} from 'styled-components';
import NextNprogress from 'nextjs-progressbar';
import SimpleReactLightbox from 'simple-react-lightbox';
import 'antd/dist/antd.css';
import {colors} from 'utils/colors';

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
        <SimpleReactLightbox>
          <Component {...pageProps} />
        </SimpleReactLightbox>
      </ThemeProvider>
      <NextNprogress
        color={colors.figmentYellow}
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
    </>
  );
}

export default MyApp;
