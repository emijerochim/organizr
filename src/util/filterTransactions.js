import moment from "moment/moment";

const filterTransactions = (transactions, timespan) => {
  transactions.filter(
    (transaction) =>
      moment(transaction.date).isAfter(transaction.date.startOf(timespan)) &&
      moment(transaction.date).isBefore(transaction.date.endOf(timespan))
  );
};

export default filterTransactions;
