import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import moment from "moment/moment";
import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";
import MonthView from "./routes/Month/MonthView";
import checkLoginToken from "./util/checkLoginToken";
import getUser from "./util/getUser";
import "./App.scss";

function App() {
  const [user, setUser] = useState({});
  const [dayToView, setDayToView] = useState(moment());

  useEffect(() => {
    checkLoginToken(setUser);
    if (user.username) {
      getUser(user.username).then((data) => {
        setUser((prevState) => {
          return {
            ...prevState,
            transactions: data[0].transactions,
            categories: data[0].categories,
          };
        });
      });
    }
  }, [user.username, setUser]);

  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={
            user.loggedIn ? (
              <Navigate to="/calendar" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/register"
          element={user.loggedIn ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/login"
          element={
            user.loggedIn ? (
              <Navigate to="/" />
            ) : (
              <Login user={user} setUser={setUser} />
            )
          }
        />
        <Route
          path="/calendar"
          element={
            user.loggedIn ? (
              <MonthView
                user={user}
                setUser={setUser}
                dayToView={dayToView}
                setDayToView={setDayToView}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </main>
  );
}

export default App;
