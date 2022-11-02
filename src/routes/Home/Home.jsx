import React, { useState } from "react";
import MonthCalendar from "../../components/Calendars/MonthCalendar";
import YearCalendar from "../../components/Calendars/YearCalendar";
import NavBar from "../../components/NavBar/NavBar";
import moment from "moment/moment";
import "./Home.scss";

function Home() {
    const [viewDate, setViewDate] = useState(moment());
    const [viewType, setViewType] = useState("month");
  
  return (
    <div className="App">
      <NavBar
        setViewDate={setViewDate}
        setViewType={setViewType}
        viewDate={viewDate}
        viewType={viewType}
      />
      {viewType === "month" ? (
        <MonthCalendar viewDate={viewDate} />
      ) : (
        <YearCalendar viewDate={viewDate} />
      )}
    </div>
  )
}

export default Home