import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';


const ExpenseList = (props) => {
    return(
        <div className="content-container">
            <div className="list-header">
                <div className="show-for-mobile">Expenses</div>
                <div className="show-for-desktop">Expense</div>
                <div className="show-for-desktop">Amount</div>
            </div>

            {props.expenses.map((expense) => {
                return <ExpenseListItem key={expense.id} {...expense}/>;
            })}
        </div>
    );
}

export default connect((state) => {
    return{
        expenses:selectExpenses(state.expenses, state.filters)
    };
})(ExpenseList);