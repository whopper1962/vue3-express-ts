import { User } from "@/types";
import { Repository } from "typeorm";
import { User as UserEntity } from "@/models/User.entity";
import { appDataSource } from "@/database/appDataSource";

export class FetchUsersService {
  private usersRepository!: Repository<UserEntity>;

  constructor() {
    this.usersRepository = appDataSource.getRepository(UserEntity);
  }

  async execute(): Promise<User[]> {
    const rawUsers = await this.usersRepository.find();
    return rawUsers.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
  }
}
