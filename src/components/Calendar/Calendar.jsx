import Day from "../Day/Day";
import "./Calendar.scss";

function Calendar(props) {
  return (
    <div className="calendar">
      {props.days.map((day) => {
        return <Day key={day} />;
      })}
    </div>
  );
}

export default Calendar;
