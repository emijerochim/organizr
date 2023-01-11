import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { checkLoginToken, getUser } from "./routes/Login/loginFunctions";
import moment from "moment/moment";
import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";
import Calendar from "./routes/Calendar/Calendar";
import EditTransaction from "./components/Transaction/EditTransaction";
import NewTransaction from "./components/Transaction/NewTransaction";
import CategoryList from "./components/Category/CategoryList";
import NewCategory from "./components/Category/NewCategory";
import "./App.scss";

function App() {
  const [user, setUser] = useState({});
  let [dayToView, setDayToView] = useState(moment());
  let [triggerNewTransaction, setTriggerNewTransaction] = useState(false);
  let [triggerEditTransaction, setTriggerEditTransaction] = useState(false);
  let [transactionToEdit, setTransactionToEdit] = useState(null);
  let [triggerCategoryList, setTriggerCategoryList] = useState(false);
  let [triggerNewCategory, setTriggerNewCategory] = useState(false);

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
              <div className="main">
                <Calendar
                  user={user}
                  setUser={setUser}
                  dayToView={dayToView}
                  setDayToView={setDayToView}
                  setTransactionToEdit={setTransactionToEdit}
                  setTriggerNewTransaction={setTriggerNewTransaction}
                  setTriggerEditTransaction={setTriggerEditTransaction}
                  setTriggerCategoryList={setTriggerCategoryList}
                  transactionToEdit={transactionToEdit}
                />
                {triggerEditTransaction ? (
                  <EditTransaction
                    user={user}
                    setUser={setUser}
                    transaction={transactionToEdit}
                    triggerEditTransaction={triggerEditTransaction}
                    setTransactionToEdit={setTransactionToEdit}
                    setTriggerEditTransaction={setTriggerEditTransaction}
                  />
                ) : null}
                {triggerNewTransaction ? (
                  <NewTransaction
                    user={user}
                    setUser={setUser}
                    dayToView={dayToView}
                    triggerNewTransaction={triggerNewTransaction}
                    setTriggerNewTransaction={setTriggerNewTransaction}
                  />
                ) : null}
                {triggerCategoryList ? (
                  <CategoryList
                    user={user}
                    setUser={setUser}
                    triggerCategoryList={triggerCategoryList}
                    setTriggerCategoryList={setTriggerCategoryList}
                    setTriggerNewCategory={setTriggerNewCategory}
                  />
                ) : null}
                {triggerNewCategory ? (
                  <NewCategory
                    user={user}
                    setUser={setUser}
                    triggerNewCategory={triggerNewCategory}
                    setTriggerNewCategory={setTriggerNewCategory}
                  />
                ) : null}
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
