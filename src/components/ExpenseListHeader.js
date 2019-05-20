import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';


const ExpenseListHeader = ({ expenseCount, expenseTotal }) => {
    const expensePlural = expenseCount === 1 ? 'expense' : 'expenses';
    const formatExpensesTotal = numeral(expenseTotal / 100).format('$0,0.00');
    return (
        <div>
            <h1>Viewing {expenseCount} {expensePlural} Totaling {formatExpensesTotal}</h1>
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