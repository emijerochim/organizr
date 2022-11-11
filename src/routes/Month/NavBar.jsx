import React from "react";
import MonthChange from "./MonthChange";
import calculateBalance from "../../util/calculateBalance";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LogoutIcon from "@mui/icons-material/Logout";
import "./NavBar.scss";

function NavBar({ user, setUser, viewDate, setViewDate }) {
  const handleLogoutClick = () => {
    setUser({ ...user, loggedIn: false });
  };

  return (
    <div className="navbar">
      <div className="logo-container">
        <EventNoteIcon fontSize="large" />
      </div>
      <div className="user-data-container">
        <p>{user.username}</p>
        <p>$450</p>
      </div>
      <div className="stats-container"></div>
      <MonthChange setViewDate={setViewDate} viewDate={viewDate} />
      <div className="month-change-buttons">
        <button
          className="nextMonth-button"
          onClick={() => setViewDate(viewDate.add(1, "months"))}
        ></button>
        <button
          className="nextMonth-button"
          onClick={() => setViewDate(viewDate.subtract(1, "months"))}
        ></button>
      </div>
      <button className="logout-container" onClick={handleLogoutClick}>
        <LogoutIcon fontSize="large" />
      </button>
    </div>
  );
}

export default NavBar;
