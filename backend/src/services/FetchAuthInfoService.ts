import { Repository } from "typeorm";
import { User as UserEntity } from "@/models/User.entity";
import { appDataSource } from "@/database/appDataSource";
import { AuthInfo } from "@/types";

export class FetchAuthInfoService {
  private usersRepository!: Repository<UserEntity>;

  constructor() {
    this.usersRepository = appDataSource.getRepository(UserEntity);
  }

  async execute(userId: string): Promise<AuthInfo> {
    const rawUser = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!rawUser) throw new Error("User not found.");

    return {
      userName: rawUser.name,
      email: rawUser.email,
      profileImage: rawUser.profileImage,
    };
  }
}
