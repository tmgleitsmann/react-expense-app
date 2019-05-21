import React from 'react';
import { connect } from 'react-redux';
//import { compose } from 'redux';
import GoogleLogin from 'react-google-login';
import {clearExpenses} from '../actions/expenses';
import {signUp, oauthGoogle} from '../actions/users';



export class SignUp extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            error:''
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

    async onSubmit(event){
        event.preventDefault();
        const formData = {
            email:this.state.email,
            password:this.state.password,
            expenses:[]
        };
        await this.props.signUp(formData);
        if(!this.props.error.length){
            await this.props.clearExpenses();
            this.props.history.push('/dashboard');
        }
    }

    async responseGoogle(res){

        await this.props.oauthGoogle(res.accessToken); 
        if(!this.props.error.length){
            await this.props.clearExpenses();
            await this.props.startSetExpenses('google', res.profileObj.email);
            this.props.history.push('/dashboard');
        }
    }


    render(){
        return(
            <div className="bg">
            <div className="content-container">
            <div className="sign-container">
                <form className=""onSubmit={this.onSubmit.bind(this)}>
                    <input 
                        name="email" 
                        type="email" 
                        placeholder="example@example.com" 
                        label="Enter Your Email" 
                        id="email"
                        onChange = {this.onEmailChange.bind(this)}/>

                        <input 
                        name="password" 
                        type="password"
                        placeholder="yoursecretpassword" 
                        label="Enter Your Password" 
                        id="password"
                        onChange = {this.onPasswordChange.bind(this)}/>
                    <button type="submit">Sign Up!</button>
                </form>
            </div>



            <div className="sign-container">
                <h2>Or Sign Up using third-party services</h2>
                    <GoogleLogin
                        clientId="950945190745-6mr60c33s1s53gein22n30a89ssdgsot.apps.googleusercontent.com"
                        buttonText="Google"
                        onSuccess={this.responseGoogle.bind(this)}
                        onFailure={this.responseGoogle.bind(this)}
                        className = "google-button" />
                    {this.props.error ? <div>{this.props.error}</div> : null}
            </div>  

            </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    error:state.users.error,
    isAuth:state.users.isAuthenticated
});

const mapDispatchToProps = (dispatch) => {
    return{
        signUp: (user) => dispatch(signUp(user)),
        oauthGoogle: (user) => dispatch(oauthGoogle(user)),
        clearExpenses:()=>dispatch(clearExpenses()),
        startSetExpenses: (initMethod, initEmail)=>dispatch(startSetExpenses(initMethod, initEmail))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

