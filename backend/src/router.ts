import { checkAuthToken } from "./middlewares/checkAuthToken";
import { Router } from "express";
import { UsersController } from "@/controllers/UsersController";
import { AuthController } from "@/controllers/AuthController";

export const router: Router = Router();

router.get("/users", checkAuthToken, UsersController.fetchAll);

router.get(
  "/users/verify-email/:userId/:verificationToken",
  AuthController.verifyEmail,
);
router.post("/signin", AuthController.signin);
router.post("/signup", AuthController.signup);

router.get("/auth-info", checkAuthToken, AuthController.fetchAuthInfo);
