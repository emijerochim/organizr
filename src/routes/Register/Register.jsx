import API_URL from "../../util/env";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.scss";

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

  const toastConfig = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
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
      .then((res) => {
        if (res.status === 400) {
          toast.error("Email format is invalid", toastConfig);
        }
        if (res.status === 401) {
          toast.error(
            "Password should have 8 to 20 characters and at least 1 number",
            toastConfig
          );
        }
        if (res.status === 402) {
          toast.error("Username is already taken", toastConfig);
        }
        if (res.status === 403) {
          toast.error("Email is already taken", toastConfig);
        }
        if (res.status === 404) {
          toast.error("Username should have 3 to 20 characters", toastConfig);
        }
        if (res.status === 200) {
          toast.success("Registration successful", toastConfig);
        }
        res.json();
      })
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
      <ToastContainer />
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
