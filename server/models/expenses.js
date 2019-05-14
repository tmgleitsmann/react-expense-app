'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;



//create Schema & Model
const ExpenseSchema = new Schema({
    id:{
        type:String,
        required:[true, 'id field is required']
    },
    description:{
        type:String,
        required:[true, 'description field is required']
    },
    createdAt:{
        type:Number,
        required:[true, 'createdAt field is required']
    },
    amount:{
        type:Number,
        required:[true, 'amount field is required']
    },
    note:String
});

const Expense = mongoose.model('expenses', ExpenseSchema);

module.exports = Expense;

module.exports.get = function (callback, limit) {
    Expense.find({});
};