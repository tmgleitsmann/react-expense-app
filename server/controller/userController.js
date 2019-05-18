const JWT = require('jsonwebtoken');
const User = require('../models/users');
const { JWT_SECRET } = require('../configuration/index');

signToken = user => {
    return JWT.sign({
        iss:'Expense-App',
        sub:user.id,
        iat:new Date().getTime(), //current time
        exp:new Date().setDate(new Date().getDate() + 1) //current time plus 1 day ahead
    }, JWT_SECRET);

    res.status(200).json({token:token});
}

module.exports = {
    signUp: async(req, res, next) => {
        const {email, password} = req.value.body;


        let foundUser = await User.findOne({"local.email":email});
        if(foundUser){
            return res.status(403).json({error:'email is already in use'});
        }

        // Is there a Google account with the same email?
        foundUser = await User.findOne({ 
            $or: [
                { "google.email": email },
                { "facebook.email": email },
            ] 
        });

        if (foundUser) {
            // Let's merge them?
            foundUser.methods.push('local')
            foundUser.local = {
                email: email, 
                password: password
            }
            await foundUser.save()
            // Generate the token
            const token = signToken(foundUser);
            // Respond with token
            res.cookie('access_token', token, {
                httpOnly: true
            });
            res.status(200).json({ success: true });
        }

        const newUser = new User({
            method:'local',
            local: {
                email: email,
                password: password
            }
        });
        await newUser.save();

        //generate the token
        const token = signToken(newUser);
        //respond with token
        res.cookie('access_token', token, {
            httpOnly: true
        });
        //success:true
        res.status(200).json({ token });
    },
    
    signIn: async (req, res, next) => {
        // Generate token
        const token = signToken(req.user);
        res.cookie('access_token', token, {
            httpOnly: true
        });
        //success:true
        res.status(200).json({ token });
    },
    signOut: async (req, res, next) => {
        res.clearCookie('access_token');
        // console.log('I managed to get here!');
        //success:true
        res.json({ token });
    },
    googleOAuth: async (req, res, next) => {
        // Generate token
        //console.log(req.user);
        const token = signToken(req.user);
        res.cookie('access_token', token, {
            httpOnly: true
        });
        //success:true
        res.status(200).json({ token });
    },
    linkGoogle: async (req, res, next) => {
        res.json({ 
            success: true,
            methods: req.user.methods, 
            message: 'Successfully linked account with Google' 
        });
    },
    unlinkGoogle: async (req, res, next) => {
        // Delete Google sub-object
        if (req.user.google) {
            req.user.google = undefined
        }
        // Remove 'google' from methods array
        const googleStrPos = req.user.methods.indexOf('google')
        if (googleStrPos >= 0) {
            req.user.methods.splice(googleStrPos, 1)
        }
        await req.user.save()

        // Return something?
        res.json({ 
            success: true,
            methods: req.user.methods, 
            message: 'Successfully unlinked account from Google' 
        });
    },
    facebookOAuth: async (req, res, next) => {
        // Generate token
        const token = signToken(req.user);
        res.cookie('access_token', token, {
            httpOnly: true
        });
        res.status(200).json({ success: true });
    },

    linkFacebook: async (req, res, next) => {
        res.json({ 
            success: true, 
            methods: req.user.methods, 
            message: 'Successfully linked account with Facebook' 
        });
    },
    unlinkFacebook: async (req, res, next) => {
        // Delete Facebook sub-object
        if (req.user.facebook) {
            req.user.facebook = undefined
        }
        // Remove 'facebook' from methods array
        const facebookStrPos = req.user.methods.indexOf('facebook')
        if (facebookStrPos >= 0) {
            req.user.methods.splice(facebookStrPos, 1)
        }
        await req.user.save()

        // Return something?
        res.json({ 
            success: true,
            methods: req.user.methods, 
            message: 'Successfully unlinked account from Facebook' 
        });
    },
    dashboard: async (req, res, next) => {
        console.log('I managed to get here!');
        res.json({ 
            secret: "resource",
            methods: req.user.methods
        });
    },

    checkAuth: async (req, res, next) => {
        console.log('I managed to get here!');
        res.json({ success: true });
    },
    secret: async (req, res, next) => {
        console.log('i got here to secret');
        res.json({secret:'resource'});
    }

}

// exports.signIn = () => {
//     //generate token
//     //exchange already existing user for a new token
//     console.log('req.user', req.user);
//     const token = signToken(req.user);
//     res.status(200).json({token});
// };

// exports.secret = () => {
//     console.log('i got here to secret');
//     res.json({secret:'resource'});
// };

// exports.googleOAuth = () => {
//     //generate token
//     const token = signToken(req.user);
//     res.status(200).json({ token });
// }
