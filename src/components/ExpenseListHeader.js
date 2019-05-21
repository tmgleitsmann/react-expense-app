import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';


const ExpenseListHeader = ({ expenseCount, expenseTotal }) => {
    const expensePlural = expenseCount === 1 ? 'expense' : 'expenses';
    const formatExpensesTotal = numeral(expenseTotal / 100).format('$0,0.00');
    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Viewing <span>{expenseCount}</span> {expensePlural} Totaling <span>{formatExpensesTotal}</span></h1>
                <div className="page-header__actions">
                    <Link className="button button--link" to="/create">Add Expense</Link>
                </div>
            </div>
        </div>
    );
};


const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters);
    return {
        expenseCount : visibleExpenses.length,
        expenseTotal : selectExpensesTotal(visibleExpenses)
    };
};

export default connect(mapStateToProps)(ExpenseListHeader);