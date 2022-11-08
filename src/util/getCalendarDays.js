import moment from "moment/moment";

const getCalendarDays = (date) => {
  let firstDay = moment(date).startOf("month").startOf("week");
  let lastDay = moment(date).endOf("month").endOf("week");
  const daysInCalendar = lastDay.diff(firstDay, "days") + 1;
  let days = [];

  for (let i = 0; i < daysInCalendar; i++) {
    days.push(firstDay.format("D"));
    firstDay.add(1, "days");
  }

  return days;
};

export default getCalendarDays;
