import dotenv from 'dotenv';
dotenv.config();
import {Sequelize} from "sequelize-typescript";
import { User } from '../user/model/user.model';
import { UserProfile } from '../user/user_profile/model';


export const sequelize = new Sequelize("travel", "postgres", "s56u9555", {
	dialect: "postgres",
	host: "localhost",
	port: 5555,
	models: [User, UserProfile],
	modelMatch: (filename, member) => {
		return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
    }
}); 