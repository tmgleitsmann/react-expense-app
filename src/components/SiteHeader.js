import React, { Component} from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
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
                <header className="header">
                <div className="content-container">
                <div className="header__content">
                <Link className="header__title" to="/dashboard"><h1>Expenses App</h1></Link>
                {!this.props.isAuth ? 
                    <div>
                    <button className="button" name="/sign-up"><Link className="link__nav" to="/sign-up">Sign Up</Link></button>
                    <button className="button" name="/sign-in"><Link className="link__nav" to="/sign-in">Sign Up</Link></button>
                    </div>
                    :
                    <div>
                    <button className="button" onClick={this.internalSignOut.bind(this)}>Sign Out</button>
                    </div>
                }
                </div>
                </div>
                </header>
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