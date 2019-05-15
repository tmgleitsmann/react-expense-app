import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';


export class AddExpensePage extends React.Component{
    onSubmit = (expense) => {
        this.props.startAddExpense(expense);
        this.props.history.push('/dashboard');
    };
    render(){
        return(
            <div>
                <h1>This is from my add expense component</h1>
                <ExpenseForm 
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);