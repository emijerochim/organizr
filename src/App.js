import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import moment from "moment/moment";
import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";
import MonthView from "./routes/Month/MonthView";
import checkLoginToken from "./util/checkLoginToken";
import "./App.scss";

function App() {
  const [user, setUser] = useState({});
  const [viewDate, setViewDate] = useState(moment());
  const [viewType, setViewType] = useState("month");

  useEffect(() => {
    checkLoginToken(setUser);
  }, []);

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
                viewDate={viewDate}
                setViewDate={setViewDate}
                viewType={viewType}
                setViewType={setViewType}
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
