import React, { Component} from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {signOut} from '../actions/users';
import {clearExpenses} from '../actions/expenses';

class SiteHeader extends Component{
    constructor(props){
        super(props);
    }
    async internalSignOut(e){
        e.preventDefault();
        await this.props.clearExpenses();
        await this.props.signOut();
    }
    render(){
        return(
            <div>
                <ul>
                    <li>
                        <NavLink to="/" exact={true} activeClassName="is-active">Home</NavLink>
                        <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
                        <NavLink to="/about" activeClassName="is-active">About Me</NavLink>
                    </li>
                </ul>
                <ul>
                    {!this.props.isAuth ? 
                        <div>
                        <li>
                            <NavLink to="/sign-up">Sign Up</NavLink>
                        </li>
                        <li>
                            <NavLink to="/sign-in">Sign In</NavLink>
                        </li>
                        </div>
                        :
                        <li>
                            <NavLink to='/sign-in' onClick={this.internalSignOut.bind(this)}>Sign Out</NavLink>
                        </li>
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuth:state.users.isAuthenticated
});

const mapDispatchToProps = dispatch => {
    return{
        signOut: () => dispatch(signOut()),
        clearExpenses:()=>dispatch(clearExpenses())
    };  
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteHeader);