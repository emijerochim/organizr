import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
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

  const onSubmitRegister = () => {
    fetch("http://localhost:3001/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.username) {
          setRegistered(true);
        }
      });
  };

  return registered ? (
    <Navigate to="/sign-in" />
  ) : (
    <main>
      <div className="register-container">
        <fieldset id="sign_up">
          <legend>Register</legend>
          <div>
            <label htmlFor="name">Username</label>
            <input
              onChange={onUsernameChange}
              type="text"
              name="username"
              id="username"
            />
          </div>

          <div>
            <label htmlFor="email-address">Email</label>
            <input
              onChange={onEmailChange}
              type="email"
              name="email-address"
              id="email-address"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={onPasswordChange}
              type="password"
              name="password"
              id="password"
            />
          </div>
        </fieldset>
        <div>
          <input onClick={onSubmitRegister} type="submit" value="Register" />
        </div>

        <div>
          <Link to="/sign-in">Sign In</Link>
        </div>
      </div>
    </main>
  );
}

export default Register;
