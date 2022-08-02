import { Router } from 'express';
import * as UserController from '../controllers/Users/users.controller';

export const userRouter = Router({
  strict: true,
});

userRouter.get('/getUserByEmail', UserController.getUserByEmail);
userRouter.get("/getUserById", UserController.getUserById);
userRouter.get('/getSalariesByJob', UserController.getSalariesByJob);
userRouter.post("/loginUser", UserController.loginUser);
userRouter.post('/createNewUser', UserController.createNewUser);
userRouter.put('/updateUser', UserController.updateUser);
userRouter.delete('/deleteUser', UserController.deleteUser);
