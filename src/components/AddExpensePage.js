import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';
import SiteHeader from './SiteHeader';

export class AddExpensePage extends React.Component{
    onSubmit = (expense) => {
        this.props.startAddExpense(expense, this.props.method, this.props.email);
        this.props.history.push('/dashboard');
    };
    render(){
        return(
            <div>
                <SiteHeader />
                <h1>This is from my add expense component</h1>
                <ExpenseForm 
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        email: state.users.email,
        method: state.users.method
    };
};

const mapDispatchToProps = (dispatch) => ({
    startAddExpense: (expense, initMethod, initEmail) => dispatch(startAddExpense(expense, initMethod, initEmail))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddExpensePage);