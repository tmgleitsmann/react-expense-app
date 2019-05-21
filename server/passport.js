const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
//const { JWT_SECRET } = require('./configuration');
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const User = require('./models/users');
const config = require('./configuration');


//for this JwtStrategy we are going to decode the token and 
//access the payload. Query the user specified in db. 
//if user exists we're done with no errors
//if user is not specified we call done with no errors but we return false


const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['access_token'];
  }
  return token;
}

//JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
    //jwtFromRequest: cookieExtractor,
    jwtFromRequest:ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.JWT_SECRET,
    passReqToCallback:true
}, async (req, payload, done) =>{
    try{
        console.log('we are in the jwt strategy try');
        console.log('payload', payload);
        console.log('req', req);
        //Find the user in token
        const user = await User.findById(payload.sub);
        //if user does not exist, handle it
        if(!user){
            return done(null, false);
        }
        //otherwise, return the user. accessible with req.user
        req.user = user;
        done(null, user);
    } catch(error){
        done(error, false);
    }
}));

//local strategy to configure rather than create
passport.use('local', new LocalStrategy({
    //username and password authorization
    usernameField:'email'
}, async (email, password, done) => {
    try{
        //find the user by email
        const user = await User.findOne({ "local.email":email });

        //if not, handle it
        if(!user){return done(null, false);}
 
        //check if the password is correct
        const isMatch = await user.isCorrectPassword(password);

        //if not, handle it
        if(!isMatch){
            return done(null, false);
        }
        //otherwise, return the user
        done(null, user);
    }catch(error){
        done(error, false);
    }
}));

//Google OAUTH Strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID:'950945190745-6mr60c33s1s53gein22n30a89ssdgsot.apps.googleusercontent.com',
    clientSecret:'xCaFuXm0wJR3y6xVLgpc-9zO',
    passReqToCallback:true
}, async (req, accessToken, refreshToken, profile, done) => {
    try{

        if(req.user){
            req.user['google'] = {
                id:profile.id,
                email:profile.emails[0].value
            };

        await req.user.save();
        return done(null, req.user);
        }
        else{
            //we're in the account creation process
            let exists = await User.findOne({ "google.id":profile.id });
            if(exists){
                return done(null, exists);
            }
            //check to see if email is already associated
            exists = await User.findOne({ "local.email": profile.emails[0].value })
            if (exists) {
                // We want to merge google's data with local auth
                exists['google'] = {
                  id: profile.id,
                  email: profile.emails[0].value
                }
                await exists.save()
                return done(null, exists);
            }
            //
            const newUser = new User({
                method:'google',
                google:{
                    id:profile.id,
                    email:profile.emails[0].value
                }
            });
            await newUser.save();
            done(null, newUser);
        }
    }catch(error){
        done(error, false, error.message);
    }
}));