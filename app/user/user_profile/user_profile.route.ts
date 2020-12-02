import uProfileController from './user_profile.controller';
import { Router } from 'express';



const userProfileRouter = Router();

userProfileRouter.get('', uProfileController.getAll);
userProfileRouter.get('/:id', uProfileController.getOneById);
userProfileRouter.delete('/:id', uProfileController.deleteOneById);
userProfileRouter.put('/:id', uProfileController.updateOne);
userProfileRouter.post('', uProfileController.createOne);



export default userProfileRouter;
