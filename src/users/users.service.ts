import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AccountsEntity } from 'src/accounts/accounts.entity';
import { UsersEntity } from 'src/users/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userRepo: typeof UsersEntity,
  ) { }

  async findAll(): Promise<UsersEntity[]> {
    return this.userRepo.findAll<UsersEntity>()
  }

  async findOneById(id: number): Promise<UsersEntity> {
    try {
      const user = await this.userRepo.findOne({
        attributes: ['username', 'password'],
        where: { id }
      });
      return user
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOneByUsername(username: string): Promise<UsersEntity> {
    try {
      const user = await this.userRepo.findOne({
        attributes: ['id', 'username', 'password'],
        where: { username },
        include: { model: AccountsEntity }
      });
      return user
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(username: string, password: string, accountfk: number) {
    const createUser = await this.userRepo.create({ username, password, accountfk })
    return createUser.dataValues
  }

  async login(username: string, password: string) {
    return {
      username,
      password
    }
  }
}
