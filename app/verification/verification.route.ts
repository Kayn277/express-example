import verificationController  from './verification.controller';
import { Router } from 'express';


const verificationRouter = Router();

verificationRouter.get('', verificationController.verification);

export default verificationRouter;