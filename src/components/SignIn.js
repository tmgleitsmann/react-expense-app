import React from 'react';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import {signIn, oauthGoogle} from '../actions/users';
import {clearExpenses, startSetExpenses} from '../actions/expenses';
import store from '../store/configureStore';



export class SignIn extends React.Component{
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
        await this.props.signIn(formData);
        //console.log(this.props);
        if(!this.props.error.length){
            this.props.history.push('/dashboard');
        }
    }
    
    async responseGoogle(res){
        //console.log(res.accessToken);
        await this.props.oauthGoogle(res.accessToken);
        // console.log('passed our oauth');
        // console.log(res.profileObj.email);
        if(!this.props.error.length){
            await this.props.clearExpenses();
            await this.props.startSetExpenses('google', res.profileObj.email);
            this.props.history.push('/dashboard');
        }
    }


    render(){
        return(
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
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
                    <button type="submit">Sign In!</button>
                </form>
                <div>
                    <h2>Or Sign In using third-party services</h2>
                    <GoogleLogin
                        clientId="950945190745-6mr60c33s1s53gein22n30a89ssdgsot.apps.googleusercontent.com"
                        buttonText="Google"
                        onSuccess={this.responseGoogle.bind(this)}
                        onFailure={this.responseGoogle.bind(this)}
                        className = "google-button"
                     />
                </div>
                {this.props.error ? <div>{this.props.error}</div> : null}
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
        signIn: (user) => dispatch(signIn(user)),
        oauthGoogle: (user) => dispatch(oauthGoogle(user)),
        clearExpenses:()=>dispatch(clearExpenses()),
        startSetExpenses: (initMethod, initEmail)=>dispatch(startSetExpenses(initMethod, initEmail))

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);