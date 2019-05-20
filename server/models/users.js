const mongoose = require('mongoose');
const expenseObj = require('./expenses');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    method:{
        type:String,
        enum:['local', 'google', 'facebook'],
        required:[true, 'account type is required']
    },
    local:{
        email:{
            type: String,
            lowercase:true
        },
        password:{
            type:String,
        },
        expenses:{
            type:[]
        }
    },
    google:{
        id:{
            type:String
        },
        email:{
            type:String,
            lowercase:true
        },
        expenses:{
            type:[]
        }
    },
    facebook:{
        id:{
            type:String
        },
        email:{
            type:String,
            lowercase:true
        },
        expenses:{
            type:[]
        }
    },
});


UserSchema.pre('save', async function(next){
    //need to reference this.password so cannot use fat arrow function
    try{
        if(this.method !== 'local'){
            next();
        }
        // Generate a salt 
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.local.password, salt);

        this.local.password = passwordHash;
        next();
    }catch(error){
        next(error);
    }
});


UserSchema.methods.isCorrectPassword = async function(newPassword){
    try{
        return await bcrypt.compare(newPassword, this.local.password);
    }catch(error){
        throw new Error(error);
    }

}

const User = mongoose.model('users', UserSchema);

module.exports = User;

module.exports.get = function (callback, limit) {
    User.find({});
};