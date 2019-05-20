const JWT = require('jsonwebtoken');
const User = require('../models/users');
const { JWT_SECRET } = require('../configuration/index');
const Expense = require('../models/expenses');

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
        //console.log('req.value.body', req.value.body);
        const {email, password, expenses} = req.value.body;
        let foundUser = await User.findOne({"local.email":email});
        if(foundUser){
            return res.status(403).json({error:'email is already in use'});
        }
        const newUser = new User({
                method:'local',
                local: {
                    email: email,
                    password: password,
                    expenses:expenses,
                }
            });
        await newUser.save();

        // Generate the token
        const token = signToken(newUser);
        // Respond with token
        res.status(200).json({ 
            token:token,
            email:newUser.local.email,
            method:newUser.method,
            data:newUser.local.expenses
        });
},
    
    signIn: async (req, res, next) => {
        // Generate token
        console.log('sign in api endpoint', req.user);
        const localUser = req.user;
        const token = signToken(req.user);
        res.cookie('access_token', token, {
            httpOnly: true
        });
        //success:true
        res.status(200).json({
            token:token,
            email:localUser.local.email,
            method:localUser.method,
            data:localUser.local.expenses
        });
    },
    signOut: async (req, res, next) => {
        res.clearCookie('access_token');
        // console.log('I managed to get here!');
        //success:true
        res.json({ token });
    },
    googleOAuth: async (req, res, next) => {
        // Generate token
        console.log('inside server oauth func');
        const googleUser = req.user;
        const token = signToken(req.user);
        res.cookie('access_token', token, {
            httpOnly: true
        });
        console.log(googleUser);
        res.status(200).json({
            token:token,
            email:googleUser.google.email,
            method:googleUser.method,
            data:googleUser.google.expenses
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

    secret: async (req, res, next) => {
        console.log('i got here to secret');
        res.json({secret:'resource'});
    },

    index: async (req, res, next) => {
        //need to query for the email signed in with.
        const results = await User.find({});
        //see if we can grab the expenses results back
        console.log(results);
        res.json({success:true, });
    },

    removeExpense: async(req, res, next) => {
        console.log('server-side REMOVE');
        console.log(req.params.id);
        if(req.params.method === 'google'){
            let queryParam = {"google.email":req.params.email};
            let updateParam = {"$pull":{"google.expenses":{"id": req.params.id}}}; 
            const userToUpdate = await User.updateOne(queryParam, updateParam);
            // console.log(userToUpdate);
        }
        if(req.params.method === 'local'){
            let queryParam = {"local.email":req.params.email};
            let updateParam = {"$pull":{"local.expenses":{"id": req.params.id}}}; 
            const userToUpdate = await User.updateOne(queryParam, updateParam);
        }
        res.json({success:true});
    },

    grabUser: async(req, res, next) => {
        console.log(req.params);
        //1) Google => query email in google.email
        if(req.params.method === 'google'){
            const result = await User.findOne({"google.email":req.params.email});
            console.log(result);
            res.json({
                success:true,
                email:result.google.email,
                data:result.google.expenses,
                method:result.method
            });
        }
        //2) Local => query email in local.email
        if(req.params.method === 'local'){
            const result = await User.findOne({"local.email":req.params.email});
            console.log(result);
            res.json({
                success:true,
                email:result.local.email,
                data:result.local.expenses,
                method:result.method
            });
        }
    },

    new: async(req, res, next) => {
        //console.log('req params', req.params);
        const expense = new Expense();
        expense.id = req.body.id;
        expense.amount = req.body.amount;
        expense.description = req.body.description;
        expense.createdAt = req.body.createdAt;
        expense.note = req.body.note;
        console.log('object to push', expense);
        if(req.params.method === 'google'){
            const result = await User.updateOne({"google.email":req.params.email},
                {"$push":
                    {"google.expenses":
                        {
                            "id":expense.id,
                            "description":expense.description,
                            "note":expense.note,
                            "amount":expense.amount,
                            "createdAt":expense.createdAt
                        }
                    }   
                }
            );
            console.log(result);
            res.json({success:true});
        }
        if(req.params.method === 'local'){
            const result = await User.updateOne({"local.email":req.params.email},
                {"$push":
                    {"local.expenses":
                        {
                            "id":expense.id,
                            "description":expense.description,
                            "note":expense.note,
                            "amount":expense.amount,
                            "createdAt":expense.createdAt
                        }
                    }   
                }
            );
            res.json({success:true});
        }
    },

    modify: async(req, res, next) => {
        newAmount = req.body.amount;
        newDescription = req.body.description;
        newNote = req.body.note;
        newCreatedAt = req.body.createdAt;

        if(req.params.method === 'google'){
            const update = {$set:{
                "google.expenses.$.description":newDescription,
                "google.expenses.$.amount":newAmount,
                "google.expenses.$.note":newNote,
                "google.expenses.$.createdAt":newCreatedAt
            }};

            const foundUser = await User.findOneAndUpdate({
                "google.expenses.id":req.params.id
            }, update);

        }
        if(req.params.method === 'local'){
            const update = {$set:{
                "local.expenses.$.description":newDescription,
                "local.expenses.$.amount":newAmount,
                "local.expenses.$.note":newNote,
                "local.expenses.$.createdAt":newCreatedAt
            }};
            const foundUser = await User.findOneAndUpdate({
                "local.expenses.id":req.params.id
            }, update);
        }
        res.json({success:true});
    },
}

