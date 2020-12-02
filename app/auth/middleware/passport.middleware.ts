import passport from 'passport';
import { User } from '../../user/model';
import { jwtStrategy } from '../strategy/jwt.strategy';

passport.use(jwtStrategy);


passport.serializeUser((user: User, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (user: User, done) => {
    try {
        const userF = await User.findOne( {where: {id: user.id}});

        if(userF) {
            return done(null, userF.get());
        }
        else {
            throw new Error("User not found");
        }
    }
    catch (ex) {
        done(ex, null);
    }
});

export default passport;