import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.scss";

function SignIn({ setUser, setTransactions, setCategories }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitSignIn = () => {
    fetch("http://localhost:3001/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user._id) {
          setUser({
            loggedIn: true,
            id: user.id,
            username: user.username,
            email: user.email,
          });
          setTransactions(user.transactions);
          setCategories(user.categories);
        }
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
