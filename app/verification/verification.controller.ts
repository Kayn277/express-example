import { Verification } from "./model";
import {bind} from 'bind-decorator';
import {Request, Response} from 'express';
import { User } from "../user/model";
import {VerificationDTO} from './dto/verification.dto'
import logger from "../app.logger";

export class VerificationController {
    constructor(private readonly verificationModel: typeof Verification, private readonly userModel: typeof User) {}

    @bind
    async createOne(userId: number, generatedId: number) {
        let verificationDTO: VerificationDTO = {generatedId, userId};
        try {
            return await this.verificationModel.create(verificationDTO);
        }
        catch (ex) {
            logger.error(ex.message);
        }
    }

    @bind
    private async findVerification(email: string, generatedId: number) {
        try {
            let candidate = await this.verificationModel.findOne({where: { generatedId }});
            if(candidate)
            {
                let userCandidate = await this.userModel.findOne({where: {email}})
                if(userCandidate) {
                    await this.removeVerification(generatedId);
                    return await userCandidate.update({isConfirmed: true});
                }
                else {
                    logger.info("Cant find verification");
                    return "Can`t find user for this email"
                }
            }
            else {
                logger.info("Cant find verification");
                return "Can`t find verification. Maybe you are verificated?"
            }
        }   
        catch (ex) {
            logger.error(ex.message);
        }
    }
    @bind
    private async removeVerification(generatedId: number) {
        try {
            let candidate = await this.verificationModel.destroy({where: { generatedId }});
            return candidate;
        } 
        catch (ex) {
            logger.error(ex.message);
        }
    }

    @bind
    async verification(req: Request, res: Response) {
        try {
            let email = req.query.email as string;
            let generatedId = req.query.generatedId as string;
            console.log(email);
            console.log(generatedId);
            let text = await this.findVerification(email, +generatedId);
            console.log(text);
            res.send(text).status(201);
        }
        catch (ex) {
            logger.error(ex.message);
        }
    }
}

export default new VerificationController(Verification, User);