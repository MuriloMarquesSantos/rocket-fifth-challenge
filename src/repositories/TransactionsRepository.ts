import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionsResponse {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private balance: Balance;

  private transactions: Transaction[];

  constructor() {
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
    this.transactions = [];
  }

  public all() {
    return {
      transactions: this.transactions,
      balance: this.balance,
    };
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);
    if (transaction.type === 'outcome') {
      this.performWithdraw(transaction.value);
    } else {
      this.performDeposit(transaction.value);
    }
    return transaction;
  }

  private performWithdraw(transactionValue: number): void {
    if (transactionValue > this.balance.total) {
      throw new Error('Insufficient Balance');
    }
    this.balance.outcome += Math.abs(transactionValue);
    this.setTotalBalance();
  }

  private performDeposit(transactionValue: number): void {
    this.balance.income += Math.abs(transactionValue);
    this.setTotalBalance();
  }

  private setTotalBalance(): void {
    this.balance.total = this.balance.income - this.balance.outcome;
  }
}

export default TransactionsRepository;
