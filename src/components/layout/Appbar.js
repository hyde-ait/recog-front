import React, { forwardRef, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TerminalIcon from "@mui/icons-material/Terminal";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "../Link";
import LoginIcon from "@mui/icons-material/Login";
import useAuth from "../../hooks/useAuth";

export default function Appbar() {
  const user = useAuth();
  const [showUser, setShowUser] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    //show user when connected
    if (user.user !== null) {
      console.log(user);
      setShowUser(true);
      setEmail(user.user.email);
    } else {
      setShowUser(false);
      setEmail("");
    }
  }, [user]);

  const handleLogout = () => {
    user.disconnect();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="secondary" position="static">
        <Toolbar>
          {/*user.user.email ? user.user.email : null*/}
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <IconButton
              size="large"
              edge="start"
              color="primary"
              aria-label="menu"
            >
              <HomeIcon></HomeIcon>
            </IconButton>
          </Link>
          <Box sx={{ flexGrow: 1 }}>
            <Link
              size="large"
              edge="start"
              color="primary"
              aria-label="menu"
              type="button"
              href="/"
            >
              Recog Prototype
            </Link>
          </Box>

          <Link
            href="/terminal"
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            type="button"
            startIcon={<TerminalIcon />}
          >
            SSH Terminal
          </Link>
          {"|"}
          {showUser ? (
            <div>
              <Button>{email}</Button>
              {"|"}
              <Button onClick={handleLogout} startIcon={<LogoutIcon />}>
                Logout
              </Button>
            </div>
          ) : (
            <Link
              startIcon={<LoginIcon></LoginIcon>}
              type="button"
              href="/login"
              color="primary"
            >
              Login
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
