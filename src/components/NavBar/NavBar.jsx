import React from "react";
import DateChange from "./DateChange/DateChange";
import ViewTypeChange from "./ViewTypeChange/ViewTypeChange";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LogoutIcon from "@mui/icons-material/Logout";
import "./NavBar.scss";

function NavBar(props) {
  const handleLogoutClick = () => {
    console.log("logout clicked");
  };

  return (
    <div className="navbar">
      <div className="logo-container">
        <EventNoteIcon fontSize="large" />
      </div>
      <div className="user-data-container">
        <p>Emi</p>
        <p>$450</p>
      </div>
      <div className="stats-container"></div>
      <DateChange
        setViewDate={props.setViewDate}
        viewDate={props.viewDate}
        viewType={props.viewType}
      />
      <ViewTypeChange setViewType={props.setViewType} />
      <button className="logout-container" onClick={handleLogoutClick}>
        <LogoutIcon fontSize="large" />
      </button>
    </div>
  );
}

export default NavBar;
