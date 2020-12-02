import authenticateController from './auth.controller';
import { Router } from 'express';



const authRouter = Router();

authRouter.get('', );
authRouter.post('/login', authenticateController.login);
authRouter.post('/register', authenticateController.register);


export default authRouter;
