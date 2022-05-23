import { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import registerStyle from "../styles/registerStyle";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import HowToRegIcon from "@mui/icons-material/HowToReg";

export default function Login() {
  return (
    <form className="container">
      <h3>Sign In</h3>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          id="email"
          required
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          required
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
      <button type="submit" className="registerbtn">
        Submit
      </button>
      <p className="forgot-password">
        Forgot <a href="#">password?</a>
      </p>
      <p>
        <Link href="register">
          <Button startIcon={<HowToRegIcon />} color={"secondary"}>
            Register
          </Button>
        </Link>
      </p>
      <p>
        <Link className="links" href="/">
          <Button startIcon={<HomeIcon />} color={"secondary"}>
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
