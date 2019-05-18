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


// const mapStateToProps = (state, props) => {
//     console.log(state.users[0].email);
//     return {
//         state.users[0].email;
//     };
// };

export default ExpenseDashboardPage;
//export default connect(mapStateToProps)(ExpenseDashboardPage);