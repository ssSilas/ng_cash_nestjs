import { TransactionsEntity } from "./transactions.entity";


export const transactionsProviders = [
  {
    provide: 'TRANSACTIONS_REPOSITORY',
    useValue: TransactionsEntity,
  },
];