import { store } from "../store/index";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import "../styles/globals.css";
import moment from 'moment'
moment.locale('id');

const theme = createTheme({
  palette: {
    // mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
  typography: {
    fontFamily: 'sans-serif',
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
}
