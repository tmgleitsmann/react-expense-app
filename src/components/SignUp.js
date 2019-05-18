import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
//import { reduxForm, Field } from 'redux-form';
import GoogleLogin from 'react-google-login';
//import FacebookLogin from 'react-facebook-login';

//import whatever action you need here




export class SignUp extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:''
        };
    }


    onEmailChange = (event) => {
        const emailText = event.target.value;
        this.setState({
            email:emailText
        });
        
    }
    onPasswordChange = (event) => {
        const passText = event.target.value;
        this.setState({
            password:passText
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        //const user = this.state;
        const user = {
            email:this.state.email,
            password:this.state.password,
            expenses:[]
        };
        console.log(user);
        //we need to validate that the email is valid and the password is ok to use
        //this.props.startAddUser(user);
        this.props.history.push('/dashboard');
    }



    render(){
        return(
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input name="email" onChange={this.onEmailChange.bind(this)} value={this.state.email} type="text" placeholder="JohnDoe@gmail.com"/>
                    <input name="password" onChange={this.onPasswordChange.bind(this)} value={this.state.password} type="password" placeholder="password"/>
                    <button>Sign Up!</button>
                </form>
            </div>
        )
    }
}


export default SignUp;
