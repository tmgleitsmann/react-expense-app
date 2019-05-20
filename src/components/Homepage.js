import React, { Component} from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Homepage extends React.Component{
    constructor(props){
        super(props);
    }

    changeRoute = (event) =>{
        console.log(event.target.name);
        this.props.history.push('/'+event.target.name);
    }

    render(){
        const redir = this.props.isAuth;
        return(
            <div>
            { !redir ? 
                 <div>
                    <button name="sign-up" onClick={this.changeRoute.bind(this)}>Sign Up</button>
                    <button name="sign-in" onClick={this.changeRoute.bind(this)}>Sign In</button>
                </div>
                : 
                <Redirect to='/dashboard'/>
            }
           </div>
        );
    }
}



const mapStateToProps = state => ({
    isAuth:state.users.isAuthenticated
});


export default connect(mapStateToProps)(Homepage);
