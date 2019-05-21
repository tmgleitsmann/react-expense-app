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
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Let's Add An Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm 
                        onSubmit={this.onSubmit}
                    />
                </div>
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