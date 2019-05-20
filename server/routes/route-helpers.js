'use strict';
const Joi = require('joi');
const mongoose = require('mongoose');

//const Schema = mongoose.Schema;


module.exports = {
    validateBody:(schema) => {
        return (req, res, next) => {
            console.log('validated req.body', req.body);
            const result = Joi.validate(req.body, schema);
            console.log('results', result);
            if(result.error){
                return res.status(400).json(result.error);
            }
            if(!req.value){req.value = {};}
            req.value['body'] = result.value;
            next();
            //req.value.body
        }
    },

    schemas:{
        AuthSchema:Joi.object().keys({
            email:Joi.string().email().required(),
            password:Joi.string().required(),
            expenses:Joi.array().items(Joi.object())
        })
    }
}
