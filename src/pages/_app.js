import { createTheme, ThemeProvider } from '@mui/material';
import { indigo } from '@mui/material/colors';

import '@/styles/globals.scss';

const theme = createTheme({
  palette: {
    primary: { main: indigo[500] },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
