import UserController from "./user.controller";
import { Router } from 'express';


const userRouter = Router();

userRouter.get('', UserController.getAll);
userRouter.get('/:id', UserController.getOneById);
userRouter.delete('/:id', UserController.deleteOneById);
userRouter.put('/:id', UserController.updateOne);
userRouter.post('', UserController.createOne);


export default userRouter;
