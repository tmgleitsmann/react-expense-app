import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';


const ExpenseModel = require('../models/expenses');

const writeToDB = ({description}, {amount}, {createdAt}, {note}) => ({
    let expense = new ExpenseModel({
        description,
        amount,
        createdAt,
        note
    });
    console.log('save to mongodb')
    expense.save().then(doc => {
        console.log(doc)
    }).catch(err => {
        console.error(err)
    })
});  

const AddExpensePage = (props) => (
    <div>
        <h1>This is from my add expense component</h1>
        <ExpenseForm 
        onSubmit = {(expense) => { 
            writeToDb(props.dispatch(addExpense(expense)));
            props.history.push('/'); 
        }}
        />
    </div>
);

export default connect()(AddExpensePage);