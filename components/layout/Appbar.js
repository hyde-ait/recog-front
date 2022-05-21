import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TerminalIcon from "@mui/icons-material/Terminal";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import Link from "@mui/material/Link";
import LoginIcon from "@mui/icons-material/Login";

export default function Appbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="secondary"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <IconButton
              size="large"
              edge="start"
              color="secondary"
              aria-label="menu"
            >
              <HomeIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <h3>RECOG PROTOTYPE</h3>
          </Typography>
          <Link href="/terminal">
            <Button
              size="large"
              edge="start"
              color="secondary"
              aria-label="menu"
              startIcon={<TerminalIcon />}
            >
              SSH Terminal
            </Button>
          </Link>
          {"|"}
          <Link href="/login">
            <Button startIcon={<LoginIcon></LoginIcon>} color="secondary">
              Login
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
