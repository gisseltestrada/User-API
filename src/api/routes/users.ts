import { Router } from "express";
import * as UserController from "../controllers/Users/users.controller";

export const userRouter = Router({
  strict: true,
});

userRouter.get("/getUserByEmail", UserController.getUserByEmail);
