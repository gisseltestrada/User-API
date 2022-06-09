import { Router } from "express";
import * as UserController from "../controllers/Users/users.controller";

export const userRouter = Router({
  strict: true,
});

userRouter.get("/getUserByEmail", UserController.getUserByEmail);
userRouter.get("/getSalariesByJob", UserController.getSalariesByJob);
userRouter.get("/createNewUser", UserController.createNewUser);
userRouter.get("/updateUser", UserController.updateUser);
userRouter.get("/deleteUser", UserController.deleteUser);