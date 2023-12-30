import { Repository } from "typeorm";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { User as UserEntity } from "@/models/User.entity";
import { appDataSource } from "@/database/appDataSource";
import { SignInInfo } from "@/types";

export class SigninUserService {
  private readonly _usersRepository!: Repository<UserEntity>;

  constructor() {
    this._usersRepository = appDataSource.getRepository(UserEntity);
  }

  async execute(
    signInInfo: SignInInfo,
  ): Promise<{ token: string; userId: string }> {
    const user = await this._usersRepository.findOne({
      where: {
        email: signInInfo.email,
      },
    });

    if (!user) throw new Error("User not found.");

    const isPasswordCorrect = await bcrypt.compare(
      signInInfo.password,
      user.password,
    );

    if (!isPasswordCorrect) throw new Error("Authorization error");

    if (!user.isVerified) throw new Error("User is not verified.");

    const jwtPayload = {
      id: user.id,
    };

    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    if (!jwtSecretKey) throw new Error("JWT secret key must be provided.");

    const token = sign(jwtPayload, jwtSecretKey, {
      expiresIn: "1h",
    });

    return {
      token,
      userId: user.id,
    };
  }
}
