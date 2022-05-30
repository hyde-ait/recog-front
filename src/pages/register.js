import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import registerStyle from "../styles/registerStyle";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Router from "next/router";
import useAuth from "../hooks/useAuth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const user = useAuth();

  const handleEmail = (e) => {
    console.log(user);
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handlePwdconfirm = (e) => {
    if (e.target.value !== password) {
      setConfirm("The passwords are not identical!");
    } else {
      setConfirm("");
    }
    if (e.target.value === "") {
      setConfirm("");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    user.createUser(email, password);
    if (user.error === null) {
      Router.push("/");
    } else {
      console.log(user.error);
      setError(user.error);
    }
  };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div className="container">
        <h1>Register</h1>
        <p>Please fill in this form to create an account.</p>
        <Divider
          light
          sx={{
            borderColor: "white",
            borderRadius: 2,
            marginBottom: "50px",
            marginTop: "50px",
          }}
        />

        {/*<div>
            <label htmlFor="name">
              <b>Name</b>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              id="email"
              required
            />
          </div> */}
        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          id="email"
          required
          onChange={handleEmail}
        />

        <label htmlFor="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          id="psw"
          onChange={handlePassword}
          required
        />

        <label htmlFor="psw-repeat">
          <b>Repeat Password</b>
        </label>
        <input
          type="password"
          placeholder="Repeat Password"
          name="psw-repeat"
          id="psw-repeat"
          onChange={handlePwdconfirm}
        />
        <pre style={{ color: "red" }}>{confirm}</pre>
        <Divider
          light
          sx={{ borderColor: "white", borderRadius: 2, marginTop: "50px" }}
        />

        <p>
          By creating an account you agree to our{" "}
          <a href="#">Terms & Privacy</a>.
        </p>
        <button onClick={handleRegister} className="registerbtn">
          Register
        </button>
        <pre style={{ color: "red" }}>{user.error}</pre>
        <p>
          Already have an account? <Link href="login">Sign in</Link>.
        </p>
      </div>
      <style jsx global>
        {registerStyle}
      </style>
    </Box>
  );
}
