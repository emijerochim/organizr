import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./routes/Home/Home";
import SignIn from "./routes/SignIn/SignIn";
import Register from "./routes/Register/Register";

function App() {
  const [user, setUser] = useState({
    loggedIn: false,
    id: "",
    username: "",
    email: "",
    transactions: [],
    categories: [],
  });

  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={user.loggedIn ? <Home /> : <Navigate to="/register" />}
        />
        <Route
          path="/signin"
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
          element={
            user.loggedIn ? (
              <Navigate to="/signin" />
            ) : (
              <Register user={user} setUser={setUser} />
            )
          }
        />
      </Routes>
    </main>
  );
}

export default App;
