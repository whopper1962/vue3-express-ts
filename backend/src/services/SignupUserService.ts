import { NewUser } from "@/types";
import { EntityManager, Repository } from "typeorm";
import bcrypt from "bcrypt";
import { User as UserEntity } from "@/models/User.entity";
import { appDataSource } from "@/database/appDataSource";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import { VerificationToken } from "@/models/VerificationToken.entity";

export class SignupUserService {
  private readonly _usersRepository!: Repository<UserEntity>;
  private readonly _tokensRepository!: Repository<VerificationToken>;

  constructor() {
    this._usersRepository = appDataSource.getRepository(UserEntity);
    this._tokensRepository = appDataSource.getRepository(VerificationToken);
  }

  async execute(newUser: NewUser): Promise<void> {
    await appDataSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const existsUser = await this._usersRepository.findOne({
          where: {
            email: newUser.email,
          },
        });
        if (existsUser) throw new Error("User already exists.");

        const hashedPassword = await bcrypt.hash(newUser.password, 10);

        const newUserEntity = this._usersRepository.create({
          name: newUser.name,
          email: newUser.email,
          password: hashedPassword,
          profileImage: newUser.profileImage,
          isVerified: false,
        });

        await transactionalEntityManager.save(newUserEntity);

        const verificationToken = uuidv4();

        const newTokenEntity = this._tokensRepository.create({
          token: verificationToken,
          user: newUserEntity,
        });

        await transactionalEntityManager.save(newTokenEntity);

        const mailTransporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        await mailTransporter.sendMail({
          from: process.env.EMAIL_USER,
          to: newUser.email,
          subject: "Account Verification Link",
          text: `
Hello, ${newUser.name}!
Please verify your email by clicking this link : ${process.env.APP_ORIGIN}/users/verify-email/${newUserEntity.id}/${verificationToken}
          `,
        });
      },
    );
  }
}
