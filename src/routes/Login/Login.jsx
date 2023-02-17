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
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser({
            username: data.user.username,
            email: data.user.email,
            password: data.user.password,
            loggedIn: true,
            transactions: data.user.transactions,
            categories: data.user.categories,
          });
          localStorage.setItem("user", data.user);
        }
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
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
          <button
            onClick={onSubmitLogin}
            type="submit"
            className="log-in-submit-button"
          >
            Enter
          </button>
        </div>
        <div className="register-link-container">
          <Link to="/register" className="register-link">
            Register
          </Link>
        </div>
        <div className="test-login-data-container">
          <p className="test-login-data">
            If you want to test the app use these credentials
          </p>
          <p className="test-login-data">Username: test</p>
          <p className="test-login-data">Password: TEST1234</p>
        </div>
      </div>
    </main>
  );
}

export default Login;
