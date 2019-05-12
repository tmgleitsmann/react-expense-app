import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';


function SiteHeader(props){
    return(
        <header className="testing">
            <h1>Some Header Goes Here </h1>
            <NavLink to="/" exact={true} activeClassName="is-active">Home</NavLink>
            <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
            <NavLink to="/about" activeClassName="is-active">About Me</NavLink>
        </header>
    );
}

export default SiteHeader;