import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
import SiteHeader from './SiteHeader';

const EditExpensePage = (props) => {
    return (
        <div>
            <SiteHeader />
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">Edit Expense</h1>
                </div>
            </div>
            <div className="content-container">
            <ExpenseForm
                expense = {props.expense}
                onSubmit={(expense) => {
                    props.dispatch(startEditExpense(props.expense.id, props.method, props.email, expense));
                    props.history.push('/dashboard'); 
                }}
            />
            <button className="button button--secondary"onClick={(expense) => {
                props.dispatch(startRemoveExpense({id:props.expense.id, method:props.method, email:props.email}));
                props.history.push('/dashboard'); 
            }}>Remove</button>
            </div>
        </div>
    );
};

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id ),
        email: state.users.email,
        method: state.users.method
    };
};

const mapDispatchToProps = (dispatch) => ({
    startEditExpense: (expenseId, initMethod, initEmail, expense) => dispatch(startAddExpense(expenseId, initMethod, initEmail, expense)),
    startRemoveExpense: (expense) => dispatch(startRemoveExpense(expense))
});

export default connect(mapStateToProps)(EditExpensePage);