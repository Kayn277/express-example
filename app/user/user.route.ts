import UserController from "./user.controller";
import { Router } from 'express';
import userController from "./user.controller";


const userRouter = Router();

userRouter.get('', userController.getAll);
userRouter.get('/:id', UserController.getOneById);
userRouter.delete('/:id', UserController.deleteOneById);
userRouter.put('/:id', UserController.updateOne);
userRouter.post('', UserController.createOne);


export default userRouter;
