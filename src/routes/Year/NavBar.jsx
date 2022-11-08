import React from "react";
import YearChange from "./YearChange";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LogoutIcon from "@mui/icons-material/Logout";
import "./NavBar.scss";

function NavBar({
  user,
  setUser,
  viewDate,
  setViewDate,
  selected,
  setSelected,
}) {
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
      <YearChange setViewDate={setViewDate} viewDate={viewDate} />
      <div className="month-change-buttons">
        <button
          className="nextMonth-button"
          onClick={() => setSelected(selected.add(1, "months"))}
        ></button>
        <button
          className="nextMonth-button"
          onClick={() => setSelected(selected.subtract(1, "months"))}
        ></button>
      </div>
      <button className="logout-container" onClick={handleLogoutClick}>
        <LogoutIcon fontSize="large" />
      </button>
    </div>
  );
}

export default NavBar;
