import React from 'react'
import ExpenseListHeader from './ExpenseListHeader';
import ExpenseList from './ExpenseList';
import ExpenseListFilter from './ExpenseListFilter';


const ExpenseDashboardPage = () => {
    return(
        <div>
            <ExpenseListHeader />
            <ExpenseListFilter />
            <ExpenseList />
        </div>
    )
};

export default ExpenseDashboardPage;