import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import moment from "moment/moment";
import SignIn from "./routes/SignIn/SignIn";
import Register from "./routes/Register/Register";
import MonthView from "./routes/Month/MonthView";
import YearView from "./routes/Year/YearView";
import "./App.scss";

function App() {
  const [user, setUser] = useState({
    loggedIn: false,
    id: "",
    username: "",
    email: "",
  });
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [viewDate, setViewDate] = useState(moment());

  useEffect(() => {
    fetch(`http://localhost:3001/transactions/${user.username}`)
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
      });
    fetch(`http://localhost:3001/categories/${user.username}`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      });
  }, [user]);

  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={
            user.loggedIn ? (
              <Navigate to="/month" />
            ) : (
              <Navigate to="/register" />
            )
          }
        />
        <Route
          path="/sign-in"
          element={
            user.loggedIn ? (
              <Navigate to="/" />
            ) : (
              <SignIn
                setUser={setUser}
                setTransactions={setTransactions}
                setCategories={setCategories}
              />
            )
          }
        />
        <Route
          path="/register"
          element={user.loggedIn ? <Navigate to="/signIn" /> : <Register />}
        />
        <Route
          path="/year"
          element={
            user.loggedIn ? (
              <YearView
                viewDate={viewDate}
                setViewDate={setViewDate}
                transactions={transactions}
                setTransactions={setTransactions}
                categories={categories}
                setCategories={setCategories}
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
                viewDate={viewDate}
                transactions={transactions}
                setTransactions={setTransactions}
                categories={categories}
                setCategories={setCategories}
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
