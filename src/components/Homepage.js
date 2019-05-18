import React, { Component} from 'react';


class Homepage extends React.Component{
    constructor(props){
        super(props);
    }

    changeRoute = (event) =>{
        console.log(event.target.name);
        this.props.history.push('/'+event.target.name);
    }

    render(){
        return(
            <div>
               <button name="sign-up" onClick={this.changeRoute.bind(this)}>Sign Up</button>
               <button name="sign-in" onClick={this.changeRoute.bind(this)}>Sign In</button>
            </div>
        );
    }
}



export default Homepage;
