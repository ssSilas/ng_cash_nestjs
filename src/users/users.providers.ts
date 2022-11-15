import { UsersEntity } from "./users.entity"; 

export const usersProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: UsersEntity,
  },
];