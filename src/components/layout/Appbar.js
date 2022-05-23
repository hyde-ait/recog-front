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
            ></IconButton>
          </Link>
          <Box sx={{ flexGrow: 1 }}>
            <Link href="/">
              {" "}
              <Button
                size="large"
                edge="start"
                color="secondary"
                aria-label="menu"
              >
                <Typography variant="h3" component="div">
                  {" "}
                  Recog Prototype
                </Typography>
              </Button>
            </Link>
          </Box>

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
