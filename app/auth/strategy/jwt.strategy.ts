import {Strategy as Jwt, ExtractJwt} from 'passport-jwt';
import { User } from '../../user/model';


const jwtStrategy = new Jwt({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "My_Secret"
}, async (payload, done) => {
    try {
        const candidate = await User.findOne({where: {id: payload.id}});
        if(candidate) {
            return done(null, candidate.get());
        }   
        else {
            throw new Error('User not found');
        }
    }
    catch (ex) {
        return done(ex, null);
    }

});