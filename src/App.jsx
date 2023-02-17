import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import moment from "moment/moment";
import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";
import Calendar from "./routes/Calendar/Calendar";
import NavBar from "./routes/Calendar/NavBar";
import Footer from "./components/Footer/Footer";
import EditTransaction from "./components/Transaction/EditTransaction";
import NewTransaction from "./components/Transaction/NewTransaction";
import EditCategory from "./components/Category/EditCategory";
import NewCategory from "./components/Category/NewCategory";
import CategoryList from "./components/Category/CategoryList";
import DayView from "./components/Day/DayView";
import { useAuth } from "./hooks/useAuth";
import "./App.scss";

function App() {
  let [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
    loggedIn: false,
    transactions: [],
    categories: [],
  });
  let [day, setDay] = useState(moment());
  let [transaction, setTransaction] = useState({});
  let [category, setCategory] = useState({});
  let [triggers, setTriggers] = useState({
    newTransaction: false,
    editTransaction: false,
    newCategory: false,
    editCategory: false,
    categoryList: false,
    dayView: false,
  });

  useAuth(user, setUser);

  return (
    <main className="routes-main">
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
            user.loggedIn ? <Navigate to="/" /> : <Login setUser={setUser} />
          }
        />
        <Route
          path="/calendar"
          element={
            user.loggedIn ? (
              <div className="app-main">
                <NavBar
                  user={user}
                  setUser={setUser}
                  day={day}
                  setDay={setDay}
                  triggers={triggers}
                  setTriggers={setTriggers}
                />

                <Calendar
                  user={user}
                  day={day}
                  setDay={setDay}
                  setTransaction={setTransaction}
                  triggers={triggers}
                  setTriggers={setTriggers}
                />

                <Footer />
                {
                  <main className="triggers-main">
                    {triggers.newTransaction ? (
                      <NewTransaction
                        user={user}
                        setUser={setUser}
                        day={day}
                        triggers={triggers}
                        setTriggers={setTriggers}
                      />
                    ) : null}
                    {triggers.editTransaction ? (
                      <EditTransaction
                        user={user}
                        setUser={setUser}
                        transaction={transaction}
                        triggers={triggers}
                        setTriggers={setTriggers}
                      />
                    ) : null}
                    {triggers.newCategory ? (
                      <NewCategory
                        user={user}
                        setUser={setUser}
                        triggers={triggers}
                        setTriggers={setTriggers}
                      />
                    ) : null}
                    {triggers.editCategory ? (
                      <EditCategory
                        user={user}
                        setUser={setUser}
                        category={category}
                        triggers={triggers}
                        setTriggers={setTriggers}
                      />
                    ) : null}
                    {triggers.categoryList ? (
                      <CategoryList
                        user={user}
                        setUser={setUser}
                        setCategory={setCategory}
                        triggers={triggers}
                        setTriggers={setTriggers}
                      />
                    ) : null}
                    {triggers.dayView ? (
                      <DayView
                        user={user}
                        day={day}
                        setDay={setDay}
                        setTransaction={setTransaction}
                        triggers={triggers}
                        setTriggers={setTriggers}
                      />
                    ) : null}
                  </main>
                }
              </div>
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
