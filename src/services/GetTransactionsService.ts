import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import { Balance } from '../models/Balance';

interface TransactionsResponse {
  transactions: Transaction[];
  balance: Balance;
}

class GetTransactionsService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): TransactionsResponse {
    return this.transactionsRepository.all();
  }
}

export default GetTransactionsService;
