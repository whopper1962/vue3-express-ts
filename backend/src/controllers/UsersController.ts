import { FetchUsersService } from "@/services/FetchUsersService";
import { User } from "@/types";
import { NextFunction, Request, Response } from "express";

export class UsersController {
  static async fetchAll(
    request: Request,
    response: Response<User[]>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const users = await new FetchUsersService().execute();
      response.json(users);
    } catch (e) {
      next(e);
    }
  }
}
