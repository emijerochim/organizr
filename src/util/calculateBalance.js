const calculateBalance = (transactions) => {
  let balance = 0;
  transactions.forEach((transaction) => {
    balance += transaction.amount;
  });
  return balance;
};

module.exports = calculateBalance;
