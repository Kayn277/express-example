import { UserProfile } from "./model";
import {Request, Response } from "express";
import { bind } from "bind-decorator";
import { parse } from "path";
import { UserProfileDTO } from "./dto/user_profile.dto";
import logger from '../../app.logger';
//getAll
//getOneById
//deleteOneById
//updateOne
//createOne


export class UserProfileController {
    constructor(private readonly userProfile: typeof UserProfile) {
        
    }

    @bind
    async getAll(req: Request, res: Response) {
        try {
            let uProfiles = await this.userProfile.findAll();
            if(uProfiles) {
                res.json(uProfiles);
            }
            else {
                res.status(404).send("Not found any profile");
            }
        } catch (ex) {
            logger.error(ex.message);
            res.status(500).send(ex);
        }
    }

    @bind
    async getOneById(req: Request, res: Response) {
        try {
            let id = parseInt(req.params.id);
            if(id) {
                let uProfile = await this.userProfile.findByPk(id);
                if(uProfile) {
                    res.json(uProfile);
                }
                else {
                    res.status(404).send("Not found any profile");
                }
            }
            else {
                res.status(401).send("Id is not a number");
            }
        } catch (ex) {
            logger.error(ex.message);
            res.status(500).send(ex);
        }
    }

    @bind
    async deleteOneById(req: Request, res: Response) {
        try {
            let id = parseInt(req.params.id);
            if(id) {
                let uProfile = await this.userProfile.destroy({where: {id: id}});
                if(uProfile != 0) {
                    res.json(uProfile);
                }
                else {
                    res.status(404).send("Not found any profile");
                }
            }
            else {
                res.status(401).send("Id is not a number");
            }
        } catch (ex) {
            logger.error(ex.message);
            res.status(500).send(ex);
        }
    }

    
    @bind
    async updateOne(req: Request, res: Response) {
        try {
            let userProfile = req.body as UserProfileDTO;
            if(userProfile) {
                let uProfile = await this.userProfile.update(userProfile ,{where: {id: userProfile.id}});
                if(uProfile[0] != 0) {
                    res.json(uProfile);
                }
                else {
                    res.status(404).send("Not found profile");
                }
            }
            else {
                res.status(401).send("Is not a user profile");
            }
        } catch (ex) {
            logger.error(ex.message);
            res.status(500).send(ex);
        }
    }

    @bind
    async createOne(req: Request, res: Response) {
        try {
            let userProfile = req.body as UserProfileDTO;
            if(userProfile) {
                let uProfile = await this.userProfile.create(userProfile);
                res.json(uProfile);
             

            }
            else {
                res.status(401).send("Is not a user profile");
            }
        } catch (ex) {
            logger.error(ex.message);
            res.status(500).send(ex);
        }
    }

}

export default new UserProfileController(UserProfile);