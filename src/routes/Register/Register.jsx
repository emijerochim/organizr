import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Register.scss";
import API_URL from "../../util/env";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(false);

  const onUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitRegister = () => {
    fetch(`${API_URL}/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.username) {
          setUsername({
            username: data.username,
            email: data.email,
            password: data.password,
            loggedIn: true,
          });
          setRegistered(true);
        }
      });
  };

  return registered ? (
    <Navigate to="/login" />
  ) : (
    <main>
      <div className="register-container">
        <fieldset id="sign_up" className="register-fieldset">
          <legend className="register-legend">Register</legend>
          <div className="register-input-container">
            <label htmlFor="name" className="register-label">
              Username
            </label>
            <input
              onChange={onUsernameChange}
              type="text"
              name="username"
              id="username"
              className="register-input"
            />
          </div>

          <div className="register-input-container">
            <label htmlFor="email-address" className="register-label">
              Email
            </label>
            <input
              onChange={onEmailChange}
              type="email"
              name="email-address"
              id="email-address"
              className="register-input"
            />
          </div>

          <div className="register-input-container">
            <label htmlFor="password" className="register-label">
              Password
            </label>
            <input
              onChange={onPasswordChange}
              type="password"
              name="password"
              id="password"
              className="register-input"
            />
          </div>
        </fieldset>
        <div className="register-submit-container">
          <button
            onClick={onSubmitRegister}
            type="submit"
            className="register-submit-button"
          >
            Register
          </button>
        </div>
        <div className="login-link-container">
          <Link to="/login" className="login-link">
            Log In
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Register;
