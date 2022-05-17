import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { CreateUserInput } from './dto/input/create-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { User } from './user';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: EntityRepository<UserEntity>,
  ) {}

  public createUser(createUserData: CreateUserInput): User {
    const user = this.usersRepository.create({
      id: uuidv4(),
      ...createUserData,
    });
    this.usersRepository.persist(user);
    return user;
  }

  public async updateUserPassword(id: string, password: string) {
    return await this.usersRepository.nativeUpdate({ id }, { password });
  }

  public getUser(getUserArgs: GetUserArgs): User {
    return this.users.find((user) => user.id === getUserArgs.id);
  }

  async getUserById(id: string) {
    return await this.usersRepository.findOne({ id });
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOne({ email });
  }

  async getUsers() {
    return await this.usersRepository.findAll();
  }

  public deleteUser(deleteUserData: DeleteUserInput): User {
    const userIndex = this.users.findIndex(
      (user) => user.id === deleteUserData.id,
    );

    const user = this.users[userIndex];

    this.users.splice(userIndex);

    return user;
  }
}
