import { VerificationInfo } from "@/types";
import { Repository } from "typeorm";
import { User as UserEntity } from "@/models/User.entity";
import { appDataSource } from "@/database/appDataSource";
import { VerificationToken } from "@/models/VerificationToken.entity";

export class VerifyEmailService {
  private readonly _usersRepository!: Repository<UserEntity>;
  private readonly _tokensRepository!: Repository<VerificationToken>;

  constructor() {
    this._usersRepository = appDataSource.getRepository(UserEntity);
    this._tokensRepository = appDataSource.getRepository(VerificationToken);
  }

  async execute(verificationInfo: VerificationInfo): Promise<void> {
    const token = await this._tokensRepository.findOne({
      where: {
        token: verificationInfo.verificationToken,
        user: {
          id: verificationInfo.userId,
        },
      },
    });

    if (!token)
      throw new Error(
        "Your verification link may have expired. Please click on resend for verify your Email.",
      );

    const user = await this._usersRepository.findOne({
      where: {
        id: verificationInfo.userId,
      },
    });
    if (!user) throw new Error("User not found.");

    if (user.isVerified)
      throw new Error("User has been already verified. Please Login");

    user.isVerified = true;
    await this._usersRepository.save({
      ...user,
      isVerified: true,
    });
  }
}
