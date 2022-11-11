import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.scss";

function SignIn({ user, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitSignIn = () => {
    fetch("http://localhost:3001/sign-in", {
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
          data.user.loggedIn = true;
          setUser(data.user);
        }
        localStorage.setItem("token", data.token);
      });
  };

  return (
    <main>
      <div className="sign-in-container">
        <fieldset id="sign_up">
          <legend>Sign In</legend>
          <div>
            <label htmlFor="email-address">Username</label>
            <input
              onChange={onUsernameChange}
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
          <input onClick={onSubmitSignIn} type="submit" value="Sign in" />
        </div>
        <div>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </main>
  );
}

export default SignIn;
