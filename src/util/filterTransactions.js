import moment from "moment/moment";

const filterTransactions = (transactions, span, date) => {
  if (typeof date === "string") {
    date = moment(date, "DD-MM");
  }

  transactions.filter(
    (transaction) =>
      moment(transaction.date).isAfter(date.startOf(span)) &&
      moment(transaction.date).isBefore(date.endOf(span))
  );

  return transactions;
};

export default filterTransactions;
