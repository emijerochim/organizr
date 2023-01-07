import moment from "moment";

const getTransactionsDates = (transactions) => {
  //order transactions by its date, by default they are ordered by creation date
  transactions.sort((a, b) => {
    return moment(a.date).isAfter(b.date) ? 1 : -1;
  });

  let balance = 0;
  const balanceByDay = {};
  transactions.forEach((transaction) => {
    //get the balance of the last date in the hash table
    const lastDate = Object.keys(balanceByDay).pop();
    if (lastDate) {
      balance = balanceByDay[lastDate];
    }
    balance += transaction.amount;
    const date = moment(transaction.date).format("DD-MM-YYYY");
    balanceByDay[date] = balance;
  });
  return balanceByDay;
};

const getBalanceByDay = (transactions, day) => {
  const TransactionsDates = getTransactionsDates(transactions);
  const dates = Object.keys(TransactionsDates);
  let balance = 0;

  for (const date of dates) {
    if (
      moment(date, "DD-MM-YYYY").isSame(day) ||
      moment(date, "DD-MM-YYYY").isBefore(day)
    ) {
      balance = TransactionsDates[date];
    } else {
      break;
    }
  }

  return balance;
};

export { getTransactionsDates, getBalanceByDay };
