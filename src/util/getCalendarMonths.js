import moment from "moment/moment";

const getCalendarMonths = (date) => {
  let firstMonth = moment(date).startOf("year").startOf("month");
  let months = [];

  for (let i = 0; i < 12; i++) {
    months.push(firstMonth.format("DD-MM"));
    firstMonth.add(1, "months");
  }

  return months;
};

export default getCalendarMonths;
