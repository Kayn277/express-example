import { User } from "../user/model";
import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import { UserDTO } from "../user/dto/user.dto";
import { bind } from 'bind-decorator';
import { where } from "sequelize";
import bcrypt from 'bcrypt';
import { logger } from "../app.logger";
import nodemailer from 'nodemailer';
import { createEmail } from "./register";
import verificationController from "../verification/verification.controller";
const sendgrid = require('nodemailer-sendgrid-transport');
export class AuthenticateController {
    constructor(private readonly userModel: typeof User){ };

    private CreateToken(body:any) : string {
        return jwt.sign(
            body,
            'My_Secret',
            { expiresIn: '15m'}
        );
    }

    


    @bind
    public async login(req: Request, res: Response) {
        try {

            if(req.user) {
                const jwt = this.CreateToken(req.user);
                return res.send(jwt);
            }
    
            const sentByUser = req.body as UserDTO;
    
            const checkUser = await this.userModel.findOne({where: {email: sentByUser.email}});
    
            if(checkUser) {
                const passwordMatch = await bcrypt.compare(sentByUser.password, checkUser.password);
                if(passwordMatch) {
                    const jwt = this.CreateToken(checkUser.get());
                    return res.send(jwt);
                }
                else {
                    res.status(400).send("Password is invalid");
                }
            }
            else {
                res.status(400).send("User not found");
            }
        }
        catch (ex) {
            logger.error(ex.message);
            res.status(500).send(ex);
        }
    }

    async logout() {

    }
    @bind
    async register(req: Request, res: Response) {

        const transporter = nodemailer.createTransport(sendgrid({
            auth: {
                api_key: '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',
            },
        }))

        try {

            const sentUser = req.body as UserDTO;
            console.log("User", sentUser);
            const checkIfExists = await this.userModel.findOne({where: {email: sentUser.email}})

            if(!checkIfExists) {
                const password = await bcrypt.hash(sentUser.password, 14);
                const email = sentUser.email;
                const createdUser = await this.userModel.create({email, password});
                console.log("Password", password);
                const jwt = this.CreateToken(createdUser.get());
                const generatedId = Math.round(Math.random() * 100000);
                const createdUrl = `http://${req.headers.host}/verify?email=${email}&generatedId=${generatedId}`
                verificationController.createOne(createdUser.id, generatedId);
                transporter.sendMail(createEmail(email, 'gas2282@gmail.com', createdUrl))
                res.send("Письмо с подтверждением почты отправлено.");
            }
            else {
                res.status(400).send("User already registered");
            }
        }
        catch (ex) {
            logger.error(ex.message);
            console.log(ex);
            res.status(500).send(ex);
        }
    }


    


}


export default new AuthenticateController(User);