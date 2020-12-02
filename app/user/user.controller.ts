import bind from 'bind-decorator';
import {Request, Response} from 'express'
import { UserDTO } from './dto/user.dto';
import { User } from './model';
import { logger } from "../app.logger";

class UserController {

    constructor(private readonly userModel: typeof User) {}
    
    @bind
    public async getAll(req: Request, res: Response) {
        try {

            let users = await this.userModel.findAll();

            if(users) {
                res.json(users);
            }
            else {
                res.status(404);
            }

        }
        catch(ex) {
            logger.error(ex.message);
            res.status(500).send(ex);
        }
        
    }

    @bind
    public async getOneById(req: Request, res: Response) {
        try {

            let id = parseInt(req.params.id);

            if(id) {
                let user = await this.userModel.findByPk(id);
                res.json(user);
            } 
            else {
                throw new Error("Id is not a number");
            }

        }
        catch(ex) {
            logger.error(ex.message);
            res.status(500).send(ex);
        }
        
    }

    @bind
    public async deleteOneById(req: Request, res: Response) {
        try {
            
            let id = parseInt(req.params.id);
            if(id) {
                let destroy = await this.userModel.destroy({where:{id: id}});
                res.json(destroy);
            }
            else {
                throw new Error("Id is not a number");
            }
        }
        catch(ex) {
            logger.error(ex.message);
            res.status(500).send((ex).toString());
        }
    }

    @bind
    public async updateOne(req: Request, res: Response) {

        try {

            let user = req.body as UserDTO;
            let id = parseInt(req.params.id);
            if(user && id) {
                let updated = await this.userModel.update(user, {where: {id: id}});
                res.json(updated);
            }
            else {
                throw new Error("Not a user object or id is not a number");
            }
        }
        catch(ex) {
            logger.error(ex.message);
            res.status(500).send((ex).toString());
        }
    }

    @bind
    public async createOne(req: Request, res: Response) {
        try {
            
            console.log(req.body);
            let user = req.body as UserDTO;
            console.log(req.body);
            let checkUser = await this.userModel.findOne({where: {email: user.email}});
            if(!checkUser) {
                if(user) {
                    let created = await this.userModel.create(user);
                    res.json(created);
                }
                else {
                    throw new Error("It`s not user object");
                }
            }
            else {
                res.status(400).send("User already exists");
            }
        }
        catch(ex) {
            logger.error(ex.message);
            res.status(500).send((ex).toString());
        }
    }
}

export default new UserController(User);