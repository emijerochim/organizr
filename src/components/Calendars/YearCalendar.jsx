import Day from "../Day/Day";
import moment from "moment/moment";
import React, { useState, useEffect } from "react";
import "./YearCalendar.scss";

function YearCalendar(props) {
  let [days, setDays] = useState([]);

  useEffect(() => {
    let firstDay = moment(props.viewDate).startOf("month").startOf("week");
    let lastDay = moment(props.viewDate).endOf("month").endOf("week");
    const daysInCalendar = lastDay.diff(firstDay, "days") + 1;
    let daysToAdd = [];

    for (let i = 0; i < daysInCalendar; i++) {
      daysToAdd.push(firstDay.format("DD-MM"));
      firstDay.add(1, "days");
    }

    setDays(daysToAdd);
  }, [props.viewDate]);

  return (
    <div className="calendar-container">
      <div className="calendar">
        {days.map((day) => {
          return <Day date={day} key={day} />;
        })}
      </div>
    </div>
  );
}

export default YearCalendar;
