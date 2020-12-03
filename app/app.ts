import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { request, response } from "express";
import { sequelize } from './database/database';
import userRouter from './user/user.route';
import userProfileRouter from './user/user_profile/user_profile.route';
import { client } from './database/redis'
import session from 'express-session';
import { RedisClient } from 'redis';
import redisClient from 'connect-redis';
import passport from 'passport';
import { addHook } from 'sequelize-typescript';
import authRouter from './auth/auth.route';
import morgan from 'morgan';
import { logger } from './app.logger';
import helmet from 'helmet';
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Helmet for secure express app
app.use(helmet());


//Logger
app.use(morgan('dev', {stream: {write: message => logger.info(message) } }))


//Routes
app.use('/user', userRouter);
app.use('/user/profile', userProfileRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
	res.send(process.env.DB_HOST );
})


const redisConnection = redisClient(session);
app.use(
	session({
		store: new redisConnection({
			host: 'localhost',
			port: +'6379',
			client: client,
		}),
		secret: 'my_secret',
		resave: false,
		saveUninitialized: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());


app.listen(process.env.PORT || 3000, async () =>{
    console.log("Listen to http://localhost:" + process.env.PORT || 3000 )
    try { 
        await sequelize.sync({force: false});
    }
    catch (ex) {
        console.log(ex);
    }
});

export default app;

