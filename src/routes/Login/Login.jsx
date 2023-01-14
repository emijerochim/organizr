import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.scss";
import API_URL from "../../util/env";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitLogin = () => {
    fetch(`${API_URL}/login`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          setUser(data.user);
          data.user.loggedIn = true;
        }
        localStorage.setItem("token", data.token);
      });
  };

  return (
    <main>
      <div className="log-in-container">
        <fieldset id="log_up" className="log-in-fieldset">
          <legend className="log-in-legend">Log In</legend>
          <div className="log-in-input-container">
            <label htmlFor="email-address" className="log-in-label">
              Username
            </label>
            <input
              onChange={onUsernameChange}
              type="email"
              name="email-address"
              id="email-address"
              className="log-in-input"
            />
          </div>
          <div className="log-in-input-container">
            <label htmlFor="password" className="log-in-label">
              Password
            </label>
            <input
              onChange={onPasswordChange}
              type="password"
              name="password"
              id="password"
              className="log-in-input"
            />
          </div>
        </fieldset>
        <div className="log-in-submit-container">
          <input
            onClick={onSubmitLogin}
            type="submit"
            value="Enter"
            className="log-in-submit-button"
          />
        </div>
        <div className="register-link-container">
          <Link to="/register" className="register-link">
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Login;
