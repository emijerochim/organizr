import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import moment from "moment/moment";
import SignIn from "./routes/SignIn/SignIn";
import Register from "./routes/Register/Register";
import MonthView from "./routes/Month/MonthView";
import YearView from "./routes/Year/YearView";
import "./App.scss";

function App() {
  const [user, setUser] = useState({});
  const [viewDate, setViewDate] = useState(moment());

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      fetch("http://localhost:3001/verify-token", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: localToken,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user);
            setUser({ ...data.user, loggedIn: true });
          }
        });
    }
  }, [user.loggedIn]);

  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={
            user.loggedIn ? (
              <Navigate to="/month" />
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/sign-in"
          element={
            user.loggedIn ? (
              <Navigate to="/" />
            ) : (
              <SignIn user={user} setUser={setUser} />
            )
          }
        />
        <Route
          path="/register"
          element={user.loggedIn ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/year"
          element={
            user.loggedIn ? (
              <YearView
                user={user}
                setUser={setUser}
                viewDate={viewDate}
                setViewDate={setViewDate}
              />
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/month"
          element={
            user.loggedIn ? (
              <MonthView
                user={user}
                setUser={setUser}
                viewDate={viewDate}
                setViewDate={setViewDate}
              />
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
      </Routes>
    </main>
  );
}

export default App;
