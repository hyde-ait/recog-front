import { useState, useEffect } from "react";
import Link from "next/link";
import registerStyle from "../styles/registerStyle";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import useAuth from "../hooks/useAuth";
import Router from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const user = useAuth();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    user.login(email, password);
    if (user.error === null) {
      console.log("connected");
      Router.push("/");
    } else {
      console.log(user.error);
      setError(user.error);
    }
  };
  return (
    <form className="container">
      <h1>Sign In</h1>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          id="email"
          required
          onChange={handleEmail}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          required
          onChange={handlePassword}
        />
      </div>
      <div className="form-group">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>
      <Button onClick={handleLogin} className="registerbtn">
        Login
      </Button>
      <pre style={{ color: "red" }}>{error}</pre>
      <p className="forgot-password">
        Forgot <a href="#">password?</a>
      </p>
      <p>
        <Link href="register">
          <Button startIcon={<HowToRegIcon />} color={"primary"}>
            Register
          </Button>
        </Link>
      </p>
      <p>
        <Link className="links" href="/">
          <Button startIcon={<HomeIcon />} color={"primary"}>
            GO BACK
          </Button>
        </Link>
      </p>{" "}
      <style jsx global>
        {registerStyle}
      </style>
    </form>
  );
}
