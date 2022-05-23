import "../styles/globals.css";
import "../styles/App.css";
import "../styles/Code.css";
import "../styles/terminal.css";
import Appbar from "../components/layout/Appbar";
import Footer from "../components/layout/Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";

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
  overrides: {
    // Applied to the <ul> element
    MuiMenu: {
      list: {
        backgroundColor: "#cccccc",
      },
    },
    // Applied to the <li> elements
    MuiMenuItem: {
      root: {
        fontSize: 12,
      },
    },
  },
});

theme.typography.h3 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
};

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <Appbar />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
