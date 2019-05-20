import React from 'react'
import ExpenseListHeader from './ExpenseListHeader';
import ExpenseList from './ExpenseList';
import ExpenseListFilter from './ExpenseListFilter';
import SiteHeader from './SiteHeader';


const ExpenseDashboardPage = () => {
    return(
        <div>
            <SiteHeader />
            <ExpenseListHeader />
            <ExpenseListFilter />
            <ExpenseList />
        </div>
    )
};


export default ExpenseDashboardPage;