import { FetchAuthInfoService } from "@/services/FetchAuthInfoService";
import { SigninUserService } from "@/services/SigninUserService";
import { SignupUserService } from "@/services/SignupUserService";
import { VerifyEmailService } from "@/services/VerifyEmailService";
import { AuthInfo, SignInInfo, NewUser, VerificationInfo } from "@/types";
import { NextFunction, Request, Response } from "express";

export class AuthController {
  static async signin(
    request: Request<any, any, SignInInfo>,
    response: Response<string>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { body } = request;
      const siginInInfo = await new SigninUserService().execute(body);
      response.cookie("token", siginInInfo.token, {
        httpOnly: true,
        // secure: true,
      });

      response.status(200).send(siginInInfo.userId);
    } catch (e) {
      next(e);
    }
  }

  static async signup(
    request: Request<any, any, NewUser>,
    response: Response<string>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { body } = request;
      await new SignupUserService().execute(body);
      response.status(201).send("User successfully created.");
    } catch (e) {
      next(e);
    }
  }

  static async verifyEmail(
    request: Request<VerificationInfo>,
    response: Response<string>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { params } = request;
      await new VerifyEmailService().execute(params);
      response.status(200).send("Your account has been successfully verified");
    } catch (e) {
      next(e);
    }
  }

  static async fetchAuthInfo(
    request: Request<VerificationInfo>,
    response: Response<AuthInfo | string>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId } = request;
      const authInfo = await new FetchAuthInfoService().execute(userId);
      response.json(authInfo);
    } catch (e) {
      response.status(401).send("Authentication Failed");
    }
  }
}
