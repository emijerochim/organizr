import React, { useState } from "react";
import MonthCalendar from "../../components/Calendars/MonthCalendar";
import YearCalendar from "../../components/Calendars/YearCalendar";
import NavBar from "../../components/NavBar/NavBar";
import EditView from "../../components/Day/DayView";
import moment from "moment/moment";
import "./Home.scss";

function Home(props) {
  const [viewDate, setViewDate] = useState(moment());
  const [viewType, setViewType] = useState("month");
  const [transactions, setTransactions] = useState(props.user.transactions);

  return (
    <div className="App">
      <NavBar
        setViewDate={setViewDate}
        setViewType={setViewType}
        viewDate={viewDate}
        viewType={viewType}
      />
      {viewType === "month" ? (
        <MonthCalendar
          viewDate={viewDate}
          setViewType={setViewType}
          transactions={transactions}
          setTransactions={setTransactions}
        />
      ) : viewType === "year" ? (
        <YearCalendar
          viewDate={viewDate}
          setViewType={setViewType}
          transactions={transactions}
          setTransactions={setTransactions}
        />
      ) : (
        <EditView />
      )}
    </div>
  );
}

export default Home;
