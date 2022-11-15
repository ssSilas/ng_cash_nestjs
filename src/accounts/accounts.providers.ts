import { AccountsEntity } from "./accounts.entity";

export const accountsProviders = [
  {
    provide: 'ACCOUNTS_REPOSITORY',
    useValue: AccountsEntity,
  },
];