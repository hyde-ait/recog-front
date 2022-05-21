import "../styles/globals.css";
import "../styles/App.css";
import "../styles/Code.css";
import Appbar from "../components/layout/Appbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#112B3C",
      darker: "#112B3C",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Appbar />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
