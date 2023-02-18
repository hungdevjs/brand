import { createTheme, ThemeProvider } from '@mui/material';
import { indigo } from '@mui/material/colors';

import '@/styles/globals.scss';

import { AppContextProvider } from '@/contexts/app.context';

const theme = createTheme({
  palette: {
    primary: { main: indigo[500] },
  },
  typography: {
    fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </ThemeProvider>
  );
}
