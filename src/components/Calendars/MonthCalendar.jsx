import Day from "../Day/Day";
import moment from "moment/moment";
import React, { useState, useEffect } from "react";
import "./MonthCalendar.scss";

function MonthCalendar(props) {
  let [days, setDays] = useState([]);

  useEffect(() => {
    let firstDay = moment(props.viewDate).startOf("month").startOf("week");
    let lastDay = moment(props.viewDate).endOf("month").endOf("week");
    const daysInCalendar = lastDay.diff(firstDay, "days") + 1;
    let daysToAdd = [];

    for (let i = 0; i < daysInCalendar; i++) {
      daysToAdd.push(firstDay.format("D"));
      firstDay.add(1, "days");
    }

    setDays(daysToAdd);
  }, [props.viewDate]);

  return (
    <div className="calendar-container">
      <div className="weekday-list">
        <div className="weekday-item">
          <p>SUNDAY</p>
        </div>
        <div className="weekday-item">
          <p>MONDAY</p>
        </div>
        <div className="weekday-item">
          <p>TUESDAY</p>
        </div>
        <div className="weekday-item">
          <p>WEDNESDAY</p>
        </div>
        <div className="weekday-item">
          <p>THURSDAY</p>
        </div>
        <div className="weekday-item">
          <p>FRIDAY</p>
        </div>
        <div className="weekday-item">
          <p>SATURDAY</p>
        </div>
      </div>
      <div className="calendar">
        {days.map((day, i) => {
          return <Day setViewType={props.setViewType} date={day} key={i} />;
        })}
      </div>
    </div>
  );
}

export default MonthCalendar;
