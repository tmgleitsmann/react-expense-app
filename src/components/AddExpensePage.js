import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';


const AddExpensePage = (props) => (
    <div>
        <h1>This is from my add expense component</h1>
        <ExpenseForm 
        onSubmit = {(expense) => { 
            const expenseObj = addExpense(expense);
            props.dispatch(expenseObj);
            props.history.push('/'); 
        }}
        />
    </div>
);

export default connect()(AddExpensePage);